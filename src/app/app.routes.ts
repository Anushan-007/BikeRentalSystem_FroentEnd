import { Routes } from '@angular/router';
import { BikesComponent } from './User/bikes/bikes.component';
import { BikesDetailsComponent } from './User/bikes-details/bikes-details.component';
import { DashBoardComponent } from './AdminDashBoard/dash-board/dash-board.component';
import { HomeComponent } from './User/home/home.component';
import { BlankLayoutComponent } from './Components/blank-layout/blank-layout.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { BikeTableComponent } from './AdminDashBoard/bike-table/bike-table.component';
import { AuthGuard } from './Guard/auth.guard';
import { CustomerListComponent } from './AdminDashBoard/customer-list/customer-list.component';
import { RentalRequestListComponent } from './AdminDashBoard/rental-request-list/rental-request-list.component';
import { RentalProcessComponent } from './AdminDashBoard/rental-process/rental-process.component';
import { ReturnComponent } from './AdminDashBoard/return/return.component';
import { BikeUnitComponent } from './AdminDashBoard/bike-unit/bike-unit.component';
import { InventoryComponent } from './AdminDashBoard/inventory/inventory.component';
import { BikeEditComponent } from './AdminDashBoard/bike-edit/bike-edit.component';
// import { EditBikeComponent } from './AdminDashBoard/edit-bike/edit-bike.component';



export const routes: Routes = [
    {path:'admin', 
    component:DashBoardComponent,
    canActivate: [AuthGuard], data: { role: 'Admin' },
    children:[
      {path:'bikeTable', component:BikeTableComponent},
      {path:'bikeUnits', component:BikeUnitComponent},
      {path:'customerList', component:CustomerListComponent},
     {path:'request-list', component:RentalRequestListComponent},
     {path:'rental-process', component:RentalProcessComponent},
     {path:'return', component:ReturnComponent},
     {path:'inventory', component:InventoryComponent},
     { path: 'edit-bike/:id', component: BikeEditComponent}
      // {path:'editBike', component:EditBikeComponent}
     
    ]
    },


    {path:'user',
     component:HomeComponent,
     canActivate: [AuthGuard], data: { role: 'User' },
     children:[
        {path:'bikes', component:BikesComponent},
        {path:'bikeDetails/:id', component:BikesDetailsComponent},
     ]
    },
    
    
    
    // {
    //     path:'', 
    //     component:BlankLayoutComponent,
    //     children:[
    //       {
    //         path:'login',
    //         component:LoginComponent
    //       },
    //       {
    //         path:'register',
    //         component:RegisterComponent
    //       },{path:'**', redirectTo:'login', pathMatch:'full'}
    //     ]
    //   },

    { path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'**', redirectTo:'login', pathMatch:'full'}

];
