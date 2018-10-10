import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

import { IWeatherProvider } from "../IWeatherProvider";
import { Observable, of, forkJoin } from "rxjs/";
import { catchError, map } from 'rxjs/operators';
import { ICityModel } from "../weather.model";
import { CurrentWeather, FiveDaysWeather } from "./apiModels";
import { 
    OPEN_WEATHER_MAP_API_HOSTNAME,
    OPEN_WEATHER_MAP_5_DAY_API,
    OPEN_WEATHER_MAP_CURRENT_DAY_API
} from './constants/openWeatherMap';
import { getWeatherIconText } from './utils/helpers';
import { OPEN_WEATHER_MAP_API_KEY } from './secrets/api';
import { convertNumberToLongName, convertNumberToShortName} from "../calendar/dayConverter";
import { getDateObject } from "../calendar/miscellaneous";


// NOTE: This class is used to get relevant information from OpenWeatherMap.org api.
//       It's also used as an adapter to the weather application, which means that we can easily 
//       substitute current weather provider with different one as long as the latter is integrating 
//       app's model interface (ICityModel)
@Injectable()
export class OpenWeatherProvider implements IWeatherProvider {
    private static APPID = "appid";
    private static UNITS = "units";
    private static QUERY = "q";

    private baseUrl: string;

    public constructor(private http: HttpClient) {
        this.baseUrl = OPEN_WEATHER_MAP_API_HOSTNAME;
    }

    // NOTE: OpenWeatherMap provides sperated api url for current weather and the weather for five days.
    //       To get details from both apis we are making two requests in the same time, and proceeding
    //       when both finishes.      
    public getFullWeatherByCityName(cityName: string): Observable<ICityModel> {
        return forkJoin([
            this.getCurrentWeatherByCityName(cityName),
            this.get5DayWeatherByCityName(cityName)
        ])
        .pipe<ICityModel>(
            map(([currentWeather, _5DayWeather]) => this.extractWeatherData(currentWeather, _5DayWeather))
        );
    }

    public get5DayWeatherByCityNames(names: string[]): Observable<FiveDaysWeather[]> {
        return forkJoin(names.map(name => this.get5DayWeatherByCityName(name)));
    }

    public get5DayWeatherByCityName(cityName: string): Observable<FiveDaysWeather> {
        const url = `${this.baseUrl}${OPEN_WEATHER_MAP_5_DAY_API}`;
        return this.getWeatherByCityName<FiveDaysWeather>(cityName, url);
    }    
    
    public getCurrentWeatherByCityName(cityName: string): Observable<CurrentWeather> {
        const url = `${this.baseUrl}${OPEN_WEATHER_MAP_CURRENT_DAY_API}`;
        return this.getWeatherByCityName<CurrentWeather>(cityName, url);
    }

    public getWeatherByCityName<T>(cityName: string, url: string): Observable<T> {
        const params: HttpParams = this.generateHttpParams(cityName);
        const observable = this.http.get(url, { responseType: "json", params });

        return observable.pipe<T>(catchError(this.handleError<any>({})));
    }

    private handleError<T>(result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    // Extract weather data for searched city
    private extractWeatherData(currentWeather: CurrentWeather, fiveDaysWeather: FiveDaysWeather): ICityModel {
        let city: ICityModel = {};
        let { name, country, coord } = fiveDaysWeather.city;
        city.cityDetails = { name, country, coord };
        city.currentWeather = this.weatherInfoByDayOrTime( new Date().toString(), currentWeather );

        // We have to keep a reference of passed weather info details.
        // Otherwise we can't acomplish sorted data.
        const temp: Map<string, number> = new Map();

         /*

        Structure we want:
        {
            ...,
            _5DayWeather: [
                {
                    day_short: "Mon",
                    day_long: "Monday",
                    max_temp: 23,
                    min_temp: 14,
                    weather_by_hours: [
                        {
                            {
                                temp: 22,
                                temp_max: 25,
                                temp_min: 15,
                                pressure: 1023,
                                humidity: 80,
                                ...
                            }
                        }
                    ]
                }
            ]
        }

        */

        // array for storing weather data by day
        city._5DayWeather = [];
        for (let i = 0; i < fiveDaysWeather.list.length; i++) {
            // First we grab weather details for every 3 hours
            const weather = fiveDaysWeather.list[i];
            
            // Next, we find out what is selected day
            const day: number = getDateObject(weather.dt_txt).getDay();

            // Next, we are converting day represented in number to a string (short name)
            const day_short: string = convertNumberToShortName(day);

            // Even though this step could be done wherever inside this loop,
            // it's done at the end of defining variables.
            const weatherInfoByTime = this.weatherInfoByDayOrTime(weather.dt_txt, weather);

            // We check if we already have current day in Map() - temp
            if (!temp.has(day_short)) {
                // If not, first we get the length of _5DayWeather array.
                // We have to do this before pushing a new object into array,
                // otherwise indices don't match a we end up with weather details under the wrong day
                const length = city._5DayWeather.length;
                temp.set(day_short, length);

                city._5DayWeather.push({
                    // Weather from the current weather api's url coresponds to (some of) to weather of the first day 
                    // of 5 days weather api's url. That's why we have to include max and min temp from
                    // the current weather api because maybe those values are max or min.
                    max_temp: length === 0 ? currentWeather.main.temp_max : weatherInfoByTime.temp_max,
                    min_temp: length === 0 ? currentWeather.main.temp_max : weatherInfoByTime.temp_min,
                    day_short,
                    day_long: convertNumberToLongName(day),
                    weather_by_hour: []
                });  
            }

            // Getting selected day that is already inside Map()
            const inLoopDayWithWeatherInfo = city._5DayWeather[temp.get(day_short)];
            inLoopDayWithWeatherInfo.weather_by_hour.push(weatherInfoByTime);

            // Here we want to get max / min temp for selected day.
            // Comparing max / min temp with currently selected max / min temp of the day
            inLoopDayWithWeatherInfo.max_temp = inLoopDayWithWeatherInfo.max_temp > weatherInfoByTime.temp_max
                ? inLoopDayWithWeatherInfo.max_temp
                : weatherInfoByTime.temp_max;
            inLoopDayWithWeatherInfo.min_temp = inLoopDayWithWeatherInfo.min_temp < weatherInfoByTime.temp_min
                ? inLoopDayWithWeatherInfo.min_temp
                : weatherInfoByTime.temp_min;
        }

        return city;
    }

    private weatherInfoByDayOrTime(date: string, weather_data: any) {
        return (
            {
                date: date,
                humidity: weather_data.main.humidity,
                pressure: weather_data.main.pressure,
                temp: this.toFixed(weather_data.main.temp),
                temp_max: this.toFixed(weather_data.main.temp_max),
                temp_min: this.toFixed(weather_data.main.temp_min),
                wind_speed: weather_data.wind.speed,
                weather_description: weather_data.weather[0].description,
                weather_main: weather_data.weather[0].main,
                icon: getWeatherIconText(weather_data.weather[0].icon)
            }
        );
    }

    private toFixed(float: number): number{
        return +Number(float).toFixed(0);
    }

    private generateHttpParams(cityName: string): HttpParams {
        let params = new HttpParams();
        params = params
            .append(OpenWeatherProvider.APPID, OPEN_WEATHER_MAP_API_KEY)
            .append(OpenWeatherProvider.UNITS, "metric")
            .append(OpenWeatherProvider.QUERY, cityName);

        return params;
    }

}
