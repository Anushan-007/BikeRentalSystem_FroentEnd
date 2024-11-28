import { bikeUnits } from "./bikeUnit";
import { rentalRequest } from "./rentalRequest";

export class rentalRecord{
    id:string;
    rentalOut?:string;
    rentalReturn?:string;
    payment?:string;
    registrationNumber:string;
    rentalRequestId :string;
    unitId?:string;
    bikeUnit?:bikeUnits[];
    rentalRequest:rentalRequest;

    constructor(obj:any){
        this.id = obj.id != null ? obj.id :null;
        this.rentalOut = obj.rentalOut != null ? obj.rentalOut :null;
        this.payment = obj.payment != null ? obj.payment :null;
        this.registrationNumber = obj.registrationNumber != null ? obj.registrationNumber :null;
        this.rentalRequestId = obj.rentalRequestId != null ? obj.rentalRequestId :null;
        this.unitId = obj.unitId != null ? obj.unitId :null;
        this.rentalRequest = obj.rentalRequest != null ? obj.rentalRequest :null;
    }
}