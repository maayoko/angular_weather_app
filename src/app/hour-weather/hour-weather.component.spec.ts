import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourWeatherComponent } from './hour-weather.component';

describe('HourWeatherComponent', () => {
  let component: HourWeatherComponent;
  let fixture: ComponentFixture<HourWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
