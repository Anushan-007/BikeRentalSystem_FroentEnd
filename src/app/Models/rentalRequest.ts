import { Bike } from "./bike";

export class rentalRequest{
    id:string;
    requestTime:string;
    bikeId:string;
    nicNumber:string;
    UserAlert:boolean;
    status:Status;
    bike? : Bike;

    constructor(obj:any){
        this.id = obj.id != null ? obj.id:null;
        this.requestTime = obj.requestTime != null ? obj.requestTime :null;
        this.bikeId = obj.bikeId != null ? obj.bikeId :null;
        this.nicNumber = obj.nicNumber != null ? obj.nicNumber :null;
        this.UserAlert = obj.UserAlert != null ? obj.UserAlert :null;
        this.status = obj.status != null ? obj.status :null;
        this.bike = obj.bike != null ? obj.bike : null;
    }
}

export enum Status {
    pending = 1,
    accepted = 2,
    declined = 3
}