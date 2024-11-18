import { Routes } from '@angular/router';
import { BikesComponent } from './User/bikes/bikes.component';
import { BikesDetailsComponent } from './User/bikes-details/bikes-details.component';
import { DashBoardComponent } from './AdminDashBoard/dash-board/dash-board.component';
import { HomeComponent } from './User/home/home.component';
import { BlankLayoutComponent } from './Components/blank-layout/blank-layout.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { BikeTableComponent } from './AdminDashBoard/bike-table/bike-table.component';


export const routes: Routes = [
    {path:'admin', 
    component:DashBoardComponent,
    children:[
      {path:'bikeTable', component:BikeTableComponent}
    ]
    },


    {path:'user',
     component:HomeComponent,
     children:[
        {path:'bikes', component:BikesComponent},
        {path:'bikeDetails', component:BikesDetailsComponent},
     ]
    },
    
    
    
    {
        path:'', 
        component:BlankLayoutComponent,
        children:[
          {
            path:'login',
            component:LoginComponent
          },
          {
            path:'register',
            component:RegisterComponent
          },{path:'**', redirectTo:'login', pathMatch:'full'}
        ]
      },
];
