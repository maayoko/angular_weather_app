import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public constructor(private weatherService: WeatherService) {}

    public ngOnInit(): void {
        this.weatherService.cities$.forEach((cities: string[]) => {
            cities.forEach(city => {
                this.weatherService.addCityWeather(city);
            });
        });
    }s
}
