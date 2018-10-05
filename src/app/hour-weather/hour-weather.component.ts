import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';
import { ICityModel } from '../weather.model';
import { enterLeave } from "../animations";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-hour-weather',
    templateUrl: './hour-weather.component.html',
    styleUrls: ['./hour-weather.component.scss'],
    animations: [ enterLeave ]
})
export class HourWeatherComponent implements OnInit, OnDestroy {
    public city: ICityModel;
    public day: string;
    public weatherForTheDay: any | null;
    private subscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private weatherService: WeatherService
    ) { }

    ngOnInit() {
        const cityName = this.route.snapshot.paramMap.get("city");
        this.day = this.route.snapshot.paramMap.get("day");
        this.subscription = this.weatherService.citiesWeather$
            .subscribe((citiesWeather: Map<string, ICityModel>) => {
                if (citiesWeather.has(cityName)) {
                    this.city = citiesWeather.get(cityName);
                    this.weatherForTheDay = this.city._5DayWeather.filter(day => day.day_short.toLowerCase() === this.day)[0];
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
