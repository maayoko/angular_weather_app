import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map, scan, publishReplay, refCount } from 'rxjs/operators';
import { ICityModel } from "./weather.model";
import { OpenWeatherProvider } from "./openweathermap/openWeatherProvider";

type CitiesWeatherOperation = (cities: Map<string, ICityModel>) => Map<string, ICityModel>;
type CitiesOperation = (city: string[]) => string[];

const initialCities: string[] = ["Zagreb", "Split", "Rijeka", "Osijek"];

@Injectable()
export class WeatherService {
    // For adding cities by user
    // Not fully implemented
    cities$: Observable<string[]>;

    updateCities$: BehaviorSubject<CitiesOperation> = new BehaviorSubject<CitiesOperation>((city: string[]) => city);

    getCity$: Subject<string> = new Subject();

    // For getting cities info
    citiesWeather$: Observable<Map<string, ICityModel>>;

    updateCitiesWeather$: BehaviorSubject<CitiesWeatherOperation> = new BehaviorSubject<CitiesWeatherOperation>((cities) => cities);

    addCityWeather$: Subject<ICityModel> = new Subject();

    constructor(private weatherProvider: OpenWeatherProvider /* it should be IWeatherProvider, but dep. injection doesn't work with interfaces */) {

        this.cities$ = this.updateCities$.pipe(
            scan((cities: string[], operation: CitiesOperation) => operation(cities), initialCities),
            publishReplay(1),
            refCount()
        );

        this.getCity$.pipe(
            map((city: string) => (cities: string[]) => cities.concat(city))
        ).subscribe(this.updateCities$);

        this.citiesWeather$ = this.updateCitiesWeather$.pipe(
            scan((cities: Map<string, ICityModel>, operation: CitiesWeatherOperation) => operation(cities), new Map()),
            publishReplay(1),
            refCount()
        );

        this.addCityWeather$.pipe(
            map((city: ICityModel) => {
                return (cities: Map<string, ICityModel>) => {
                    if (!cities.has(city.cityDetails.name)) {
                        cities.set(city.cityDetails.name.toLowerCase(), city);
                    }
                    return cities;
                }
            })
        ).subscribe(this.updateCitiesWeather$)
    }

    public addCityWeather(cityName: string): void {
        this.weatherProvider.getFullWeatherByCityName(cityName)
            .subscribe((cityWeather: ICityModel) => this.addCityWeather$.next(cityWeather));
    }

    public getCity(): void {
        // TBD
    }
}
