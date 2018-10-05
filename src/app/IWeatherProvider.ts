import { Observable } from "rxjs";
import { IWeather5DayModel, IWeatherCurrentDayModel, ICityModel} from "./weather.model";

export interface IWeatherProvider {
    get5DayWeatherByCityName(cityName: string): Observable<ICityModel>;
    getCurrentWeatherByCityName(cityName: string): Observable<ICityModel>
}