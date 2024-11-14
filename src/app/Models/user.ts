export class user{
    NicNumber:string;
    Email:string;
    FirstName:string;
    LastName:string;

    ContactNo:string;
    Address:string;
    PasswordHash:string;
    roles:any;
    UserName:string;
    ProfileImage?:string;

    constructor(obj:any){
        this.NicNumber = obj.NicNumber != null ? obj.NicNumber : null;
        this.Email = obj.Email != null ? obj.Email : null;
        this.FirstName = obj.FirstName != null ? obj.FirstName : null;
        this.LastName = obj.LastName != null ? obj.LastName : null;

        this.ContactNo = obj.ContactNo != null ? obj.ContactNo : null;
        this.Address = obj.Address != null ? obj.Address : null;
        this.PasswordHash = obj.PasswordHash != null ? obj.PasswordHash : null;
        this.roles = obj.roles != null ? obj.roles : null;
        this.UserName = obj.UserName != null ? obj.UserName : null;
        this.ProfileImage = obj.ProfileImage != null ? obj.ProfileImage : null;
    }


}