export class bikeUnitUpdateDTO{
    // bikeId:string;
    unitId: string;
    brand: string;
    model: string;
    type: string;
    rentPerHour: number;
    registrationNumber: string;
    year: number;
    availability: boolean;
    bikeImages: File[];  // Files for image upload

    constructor(obj:any){
        //this.bikeId = obj.bikeId != null ? obj.bikeId : null;
        this.unitId = obj.unitId != null ? obj.unitId : null;
        this.brand = obj.brand != null ? obj.brand : null;
        this.model = obj.model != null ? obj.model : null;
        this.type = obj.type != null ? obj.type : null;
        this.rentPerHour = obj.rentPerHour != null ? obj.rentPerHour : null;
        this.registrationNumber = obj.registrationNumber != null ? obj.registrationNumber : null;
        this.year = obj.year != null ? obj.year : null;
        this.availability = obj.availability != null ? obj.availability : null;
        this.bikeImages = obj.bikeImages != null ? obj.bikeImages : null;


    }
}