export class RentalRecordRequest{
    id : string;
    payment : number;

    constructor(obj:any){
        this.id = obj.id != null ? obj.id:null;
        this.payment = obj.payment != null ? obj.payment : null;
    }
}