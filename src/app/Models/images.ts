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

// export class Image {
//     id: number;
//     unitId: number;
//     imagePath: File;         // Holds the actual File object
//     imageName: string;       // Optional: The name of the image file
//     imageType: string;       // Optional: The MIME type (e.g., 'image/jpeg', 'image/png')
//     imageSize: number;       // Optional: The size of the image file (in bytes)
  
//     constructor(obj: any) {
//       this.id = obj.id != null ? obj.id : null;
//       this.unitId = obj.unitId != null ? obj.unitId : null;
//       this.imagePath = obj.imagePath != null ? obj.imagePath : null;  // The actual image file
//       this.imageName = obj.imageName != null ? obj.imageName : (obj.imagePath ? obj.imagePath.name : '');  // Default to file name if not provided
//       this.imageType = obj.imageType != null ? obj.imageType : (obj.imagePath ? obj.imagePath.type : '');  // Default to file type if not provided
//       this.imageSize = obj.imageSize != null ? obj.imageSize : (obj.imagePath ? obj.imagePath.size : 0);  // Default to file size if not provided
//     }
//   }
  