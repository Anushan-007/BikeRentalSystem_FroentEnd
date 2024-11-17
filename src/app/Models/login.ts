export class Login{
    UserName:string;
    Password:string;

    constructor(obj:any){
        this.UserName = obj.UserName!= null ? obj.UserName : null;
        this.Password = obj.Password != null ? obj.Password : null;
    }
}