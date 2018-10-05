import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { HomeComponent }        from './home/home.component';
import { WeatherService }       from "./weather.service";
import { OpenWeatherProvider }  from "./openweathermap/openWeatherProvider";

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HomeCityComponent } from './home.city/home.city.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CityDetailsComponent } from './city-details/city-details.component';
import { SplashComponent } from './splash/splash.component';
import { HourWeatherComponent } from './hour-weather/hour-weather.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'tour-of-heroes' }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HomeCityComponent,
    CityDetailsComponent,
    SplashComponent,
    HourWeatherComponent,
    SearchComponent
  ],
  providers: [ WeatherService, OpenWeatherProvider ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
