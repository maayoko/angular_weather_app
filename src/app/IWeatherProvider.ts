import { Observable } from "rxjs";
import { ICityModel } from "./weather.model";

export interface IWeatherProvider {
    getFullWeatherByCityName(cityName: string): Observable<ICityModel>
}