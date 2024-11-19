export class Bike{
    id:number;
    brand:string;
    model:string;
    type:string;
    ratePerHour:number;
    image:string;

    constructor(obj:any){
        this.id = obj.id != null ? obj.id : null;
        this.brand = obj.brand != null ? obj.id :null;
        this.model = obj.model != null ? obj.model :null;
        this.type = obj.type != null ? obj.type :null;
        this.ratePerHour = obj.ratePerHour != null ? obj.ratePerHour : 0;
        this.image = obj.ratePerHour != null ? obj.ratePerHour : null;
    }

}