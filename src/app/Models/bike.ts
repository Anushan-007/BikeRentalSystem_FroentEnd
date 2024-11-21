import { bikeUnits } from "./bikeUnit";

export class Bike{
    id:number;
    brand:string;
    model:string;
    type:string;
    bikeUnits?:bikeUnits[];
    constructor(obj:any){
        this.id = obj.id != null ? obj.id : null;
        this.brand = obj.brand != null ? obj.id :null;
        this.model = obj.model != null ? obj.model :null;
        this.type = obj.type != null ? obj.type :null;
       this.bikeUnits = obj.bikeUnits != null ? obj.bikeUnits : null;
    }

}