export class payment{
    payment: number;
    ratePerHour: number;

    constructor(obj:any){
        this.payment = obj.payment != null ? obj.payment :null;
        this.ratePerHour  = obj.ratePerHour != null ? obj.ratePerHour:null;
    }

}