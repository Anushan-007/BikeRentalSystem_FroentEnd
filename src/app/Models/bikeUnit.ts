import { images } from "./images";

export class bikeUnits{
    unitId:number;
    bikeId:number;
    registrationNumber:string;
    year:number;
    images:images[]

    constructor(obj:any){

        this.unitId = obj.unitId != null ? obj.unitId :null;
        this.bikeId = obj.bikeId != null ? obj.bikeId :null;
        this.registrationNumber = obj.registrationNumber != null ? obj.registrationNumber :null;
        this.year = obj.year != null ? obj.year :null;
        this.images = obj.images != null ? obj.images : [];

    }

}