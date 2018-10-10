import { Component, OnInit, Input, HostListener } from '@angular/core';
import { enterLeave } from '../animations';
import { ICityModel } from '../weather.model';

@Component({
    selector: 'app-home-cities',
    templateUrl: './home-city.component.html',
    styleUrls: ['./home-city.component.scss'],
    animations: [ enterLeave ]
})
export class HomeCityComponent implements OnInit {
    @Input() public city: ICityModel;

    ngOnInit() {
    }

    public onMouseEnter(event:any) {
        
    }
}
