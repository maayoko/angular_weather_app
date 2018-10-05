import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from "../weather.service";
import { debounceTime } from 'rxjs/operators';
import { ICityModel } from '../weather.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    public cities: any[] = [];
    private subscription: Subscription;

    constructor(private weatherService: WeatherService) { }

    ngOnInit() {
        this.subscription = this.weatherService.citiesWeather$
            .subscribe((citiesWeather: Map<string, ICityModel>) => {
                this.cities = Array.from(citiesWeather.values());
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
