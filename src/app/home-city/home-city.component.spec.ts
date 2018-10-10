import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCityComponent } from './home-city.component';
import { WeatherService } from '../weather.service';

describe('Home.CityComponent', () => {
  let component: HomeCityComponent;
  let fixture: ComponentFixture<HomeCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCityComponent ],
      providers: [ WeatherService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
