import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';
import { ICityModel } from '../weather.model';
import { find, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { enterLeave } from '../animations';

@Component({
    selector: 'app-city-details',
    templateUrl: './city-details.component.html',
    styleUrls: ['./city-details.component.scss'],
    animations: [ enterLeave ]
})
export class CityDetailsComponent implements OnInit, OnDestroy {
    public city: ICityModel;
    private subscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private weatherService: WeatherService
    ) { }

    ngOnInit() {
        const cityName = this.route.snapshot.paramMap.get("city");
        this.subscription = this.weatherService.citiesWeather$
            .subscribe((cities: Map<string, ICityModel>) => {
                this.city = cities.get(cityName);
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
