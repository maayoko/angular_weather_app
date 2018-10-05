import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './home/home.component';
import { CityDetailsComponent } from "./city-details/city-details.component";
import { SearchComponent } from './search/search.component';
import { HourWeatherComponent } from './hour-weather/hour-weather.component';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: "search", component: SearchComponent, pathMatch: "full" },
  { path: ":city/:day", component: HourWeatherComponent },
  { path: ":city", component: CityDetailsComponent },
  { path: "splash", component: SplashComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
