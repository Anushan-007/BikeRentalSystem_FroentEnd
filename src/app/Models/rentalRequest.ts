export class rentalRequest{
    requestTime:string;
    bikeId:string;
    nicNumber:string;
    UserAlert:boolean;
    status:Status;

    constructor(obj:any){
        this.requestTime = obj.requestTime != null ? obj.requestTime :null;
        this.bikeId = obj.bikeId != null ? obj.bikeId :null;
        this.nicNumber = obj.nicNumber != null ? obj.nicNumber :null;
        this.UserAlert = obj.UserAlert != null ? obj.UserAlert :null;
        this.status = obj.status != null ? obj.status :null;

    }
}

export enum Status {
    pending = 0,
    accepted = 1,
    declined = 2
}