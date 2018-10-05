import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { IWeatherProvider } from "../IWeatherProvider";
import { Observable, of, forkJoin } from "rxjs/";
import { catchError, map, tap,  } from 'rxjs/operators';
import { IWeather5DayModel, IWeatherCurrentDayModel, ICityModel } from "../weather.model";
import { 
    OPEN_WEATHER_MAP_API_HOSTNAME,
    OPEN_WEATHER_MAP_5_DAY_API,
    OPEN_WEATHER_MAP_CURRENT_DAY_API
} from './constants/openWeatherMap';
import { getWeatherIconText } from './utils/helpers';
import { OPEN_WEATHER_MAP_API_KEY } from './secrets/api';
import { convertNumberToLongName, convertNumberToShortName} from "../calendar/dayConverter";

@Injectable()
export class OpenWeatherProvider implements IWeatherProvider {
    private static APPID = "appid";
    private static UNITS = "units";
    private static QUERY = "q";

    // private params: HttpParams;
    private baseUrl: string;

    public constructor(private http: HttpClient) {
        this.baseUrl = OPEN_WEATHER_MAP_API_HOSTNAME;
    }

    public getFullWeatherByCityName(cityName: string): Observable<ICityModel> {
        return forkJoin([
            this.getCurrentWeatherByCityName(cityName),
            this.get5DayWeatherByCityName(cityName)
        ])
        .pipe<ICityModel>(
            map(([currentWeather, _5DayWeather]) => {
                return {
                    cityDetails: currentWeather.cityDetails,
                    _5DayWeather: _5DayWeather._5DayWeather,
                    currentWeather: currentWeather.currentWeather
                };
            })
        )
    }

    public get5DayWeatherByCityNames(names: string[]): Observable<ICityModel[]> {
        return forkJoin(names.map(name => this.get5DayWeatherByCityName(name)));
    }

    public get5DayWeatherByCityName(cityName: string): Observable<ICityModel> {
        const url = `${this.baseUrl}${OPEN_WEATHER_MAP_5_DAY_API}`;
        return this.getWeatherByCityName(cityName, url, this.extract5DayWeatherData.bind(this));
    }    
    
    public getCurrentWeatherByCityName(cityName: string): Observable<ICityModel> {
        const url = `${this.baseUrl}${OPEN_WEATHER_MAP_CURRENT_DAY_API}`;
        return this.getWeatherByCityName(cityName, url, this.extractCurrentWeatherData.bind(this));
    }

    public getWeatherByCityName(cityName: string, url: string, extractMethod: any): Observable<any> {
        const params: HttpParams = this.generateHttpParams(cityName);
        const observable = this.http.get<any>(url, { responseType: "json", params });

        return observable.pipe(
            map(weather_data => extractMethod(weather_data)),
            catchError(this.handleError<any>({}))
        );
    }

    private handleError<T>(result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private extract5DayWeatherData(weather_data: any): ICityModel {
        let data: ICityModel;
        data = this.fillCityDetails(
            weather_data.city.name,
            weather_data.city.country,
            weather_data.city.coord.lat,
            weather_data.city.coord.lon
        );

        const temp: Map<string, number> = new Map();
        data._5DayWeather = [];
        for (let i = 0; i < weather_data.list.length; i++) {
            const weather = weather_data.list[i];
            const day = new Date(weather.dt_txt).getDay();
            const day_short: string = convertNumberToShortName(day);

            if (!temp.has(day_short)) {
                const length = data._5DayWeather.length;
                temp.set(day_short, length);

                data._5DayWeather.push({
                    day_short,
                    day_long: convertNumberToLongName(day),
                    weather_by_hour: []
                });  
            }

            data._5DayWeather[temp.get(day_short)].weather_by_hour
                .push(this.weatherInfoByDayOrTime(weather.dt_txt, weather));
        }        

        return data;
    }

    private extractCurrentWeatherData(weather_data: any) {
        let data: ICityModel;
        data = this.fillCityDetails(
            weather_data.name,
            weather_data.sys.country,
            weather_data.coord.lat,
            weather_data.coord.lon
        );

        data.currentWeather = this.weatherInfoByDayOrTime( new Date().toString(), weather_data );

        return data;
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

    private fillCityDetails(name: string, country: string, lat: number, lon: number): any {
        return (
            {
                cityDetails: {
                    name,
                    country,
                    coord: {
                        lat,
                        lon,
                    }
                }
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