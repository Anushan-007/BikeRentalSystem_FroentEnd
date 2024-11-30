export class images{
    id:number;
    unitId:number;
    imagePath:File;

    constructor(obj:any){
        this.id = obj.id != null ? obj.id :null;
        this.unitId = obj.unitId != null ? obj.unitId :null;
        this.imagePath = obj.imagePath != null ? obj.imagePath :null;

    }

}
