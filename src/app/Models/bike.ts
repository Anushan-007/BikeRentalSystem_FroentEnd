import { bikeUnits } from "./bikeUnit";

export class Bike{
    id:string;
    brand:string;
    model:string;
    type:string;
    rentPerHour:number;
    bikeUnits:bikeUnits[];
    constructor(obj:any){
        this.id = obj.id != null ? obj.id : null;
        this.brand = obj.brand != null ? obj.id :null;
        this.model = obj.model != null ? obj.model :null;
        this.type = obj.type != null ? obj.type :null;
        this.rentPerHour = obj.rentPerHour != null ? obj.rentPerHour :null;
       this.bikeUnits = obj.bikeUnits != null ? obj.bikeUnits :  [];
    }

}