import { rentalRequest } from "./rentalRequest";

export class User{
    nicNumber:string;
    firstName:string;
    lastName:string;
    email:string;
    contactNo:string;
    address:string;
    accountCreated:string;
    roles:string;
    userName:string;
     ProfileImage?:string;
     rentalRequests!:rentalRequest[];

    constructor(obj:any){
        this.nicNumber = obj.nicNumber != null ? obj.nicNumber:null;
        this.firstName = obj.firstName != null ? obj.firstName:null;
        this.lastName = obj.lastName != null ? obj.lastName:null;
        this.email = obj.email != null ? obj.email:null;
        this.contactNo = obj.contactNo != null ? obj.contactNo:null;
        this.address = obj.address != null ? obj.address:null;
        this.accountCreated = obj.accountCreated != null ? obj.accountCreated:null;
        this.roles = obj.roles != null ? obj.roles:null;
        this.userName = obj.userName != null ? obj.userName:null;
        this.ProfileImage = obj.ProfileImage != null ? obj.ProfileImage:null;
        this.rentalRequests = obj.rentalRequests != null ? obj.rentalRequests:null;
    }

}