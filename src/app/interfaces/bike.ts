import { bikeUnits } from "../Models/bikeUnit";

export interface IBike{
    id:string;
    brand:string;
    model:string;
    type:string;
    rentPerHour:number;
    bikeUnits:bikeUnits[];
}