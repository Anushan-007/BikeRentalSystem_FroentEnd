import { Routes } from '@angular/router';
import { BikesComponent } from './bikes/bikes.component';
import { BikesDetailsComponent } from './bikes-details/bikes-details.component';

export const routes: Routes = [
    {path:'', component:BikesComponent},
    {path:'bikeDetails', component:BikesDetailsComponent}
];
