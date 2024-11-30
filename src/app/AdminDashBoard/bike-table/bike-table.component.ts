import { Component, OnInit, TemplateRef, model } from '@angular/core';
import { Bike } from '../../Models/bike';
import { BikeTableService } from '../../Services/bike-table.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { bikeUnits } from '../../Models/bikeUnit';
import { images } from '../../Models/images';
import { BikeEditComponent } from '../bike-edit/bike-edit.component';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { BikeAddComponent } from '../bike-add/bike-add.component';

@Component({
  selector: 'app-bike-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers : [BsModalService],
  templateUrl: './bike-table.component.html',
  styleUrl: './bike-table.component.css'
})
export class BikeTableComponent implements OnInit {

  bikeForm!: FormGroup;
  bikesArray: Bike[] = [];
  bikes!: Bike;
  bikeUnits !: bikeUnits;
  images!: images;
  selectedFile: File | null = null;
  selected: any;
  isEditForm: boolean = false;
  editId!:string;


  loading: boolean = true;
  error: string | null = null;
  unit: any;

  constructor( private fb:FormBuilder,private bikeTableService: BikeTableService, private toastr: ToastrService, private router: Router,private modalService: BsModalService ) {
    this.bikeForm = this.fb.group({
      id: [''],
      brand: ['', [Validators.required]],
      model: [''],
      type: [''],
      rentPerHour: ['', Validators.required],
      bikeUnits: this.fb.array([this.createBikeUnit()])
    });
 
  }

  createBikeUnit(): FormGroup {
    return this.fb.group({
      RegistrationNumber: ['', Validators.required],
      year: ['', Validators.required],
      images: this.fb.array([])  // Assuming you might want to add images in the future
    });
  }


  modalRef?: BsModalRef;



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }


  onImageChange(event: any, unitIndex: number): void {
    const imageFiles: FileList = event.target.files;  // Get the list of selected image files
    const imagesFormArray = (this.myBikeUnits.at(unitIndex).get('images') as FormArray);  // Get the FormArray for images of the specific unit

    // Loop through selected image files and add them to the form array
    for (let i = 0; i < imageFiles.length; i++) {
      const imageFile: File = imageFiles[i];  // Get each file

      // Push the file object to the FormArray
      imagesFormArray.push(this.fb.group({
        imagePath: [imageFile]  // Store the entire File object, not just the name
      }));
    }
  }



  // addBike(): void {
  //   if (this.bikeForm.valid) {
  //     const bikeData = this.bikeForm.value;

  //     // Send the bike details request
  //     this.bikeTableService.postBikeData(bikeData).subscribe(
  //       (response) => {
  //         this.toastr.success('Bike added successfully!');

  //         response.bikeUnits.forEach((unit: any) => {
  //           const unitId = unit.unitId;  // Get the bike ID from the response
  //           this.uploadImages(unitId);   // Proceed to upload images after bike data is saved)
  //         });
  //       },
  //       (error) => {
  //         this.toastr.error('Failed to add bike');
  //       }
  //     );
  //   }else 
  //   if(this.isEditForm) {
  //     this.bikeTableService.updateBike(this.editId, this.bikes).subscribe
  //       ((res:Bike)=>{
  //       this.toastr.success("Bike updated");
  //     })
  //   }
  //   else {
  //     this.toastr.warning('Please fill in all required fields');
  //   }

  // }

  addBike(): void {
    if (this.bikeForm.valid) {
      const bikeData = this.bikeForm.value;
  
      // Send the bike details request (Add or Edit)
      if (this.isEditForm) {
        this.bikeTableService.updateBikeUnit(this.editId, bikeData).subscribe(
          (response) => {
            this.toastr.success('Bike updated successfully!');
            this.router.navigate(['/admin/bikeTable']);  // Navigate to the bike table after successful update
          },
          (error) => {
            this.toastr.error('Failed to update bike');
          }
        );
      } else {
        this.bikeTableService.postBikeData(bikeData).subscribe(
          (response) => {
            this.toastr.success('Bike added successfully!');
            
            response.bikeUnits.forEach((unit: any) => {
              const unitId = unit.unitId;  // Get the unit ID from the response
              this.uploadImages(unitId);   // Proceed to upload images after bike data is saved
            });
          },
          (error) => {
            this.toastr.error('Failed to add bike');
          }
        );
      }
    } else {
      this.toastr.warning('Please fill in all required fields');
    }
  }
  

  
  uploadImages(unitId: number): void {
    const bikeData = this.bikeForm.value;

    const formData = new FormData();

    bikeData.bikeUnits.forEach((unit: any) => {
      unit.images.forEach((image: images) => {
        formData.append('imagePath', image.imagePath, image.imagePath.name);

        formData.append('unitId', unitId.toString());
      });
    });

    this.bikeTableService.postBikeImages(formData).subscribe(
      (response) => {
        this.toastr.success('Images uploaded successfully!');
        this.router.navigate(['/admin/bikeTable']);
      },
      (error) => {
        this.toastr.error('Failed to upload images');
      }
    );
  }


  get myBikeUnits(): FormArray {
    return this.bikeForm.get('bikeUnits') as FormArray;
  }



    // Remove a bike unit from the bike form array
    removeCheckList(index: number): void {
      (this.bikeForm.get('bikeUnits') as FormArray).removeAt(index);
    }
  
  
    // Add a new bike unit to the bike form array
    addCheckList(): void {
      (this.bikeForm.get('bikeUnits') as FormArray).push(this.createBikeUnit());
    }

 


  ngOnInit(): void {
    this.getBikes();
  }


  getBikes() {
    this.bikeTableService.getAllBikes().subscribe({
      next: (data) => {
        console.log(data);

        this.bikesArray = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load bikes';
        this.loading = false;
      }
    })
  }



  onDeleteBike() {


  }




  // Edit(id:string){
  //   this.isEditForm = true;
  //   this.editId = id;
  //   this.bikeTableService.getBikeById(id).subscribe(
  //     (res:Bike)=>{
  //       this.bikeForm.patchValue({
  //         brand:res.brand,
  //         model:res.model,
  //         type:res.type,
  //         rentPerHour:res.rentPerHour,
  //         bikeUnits:res.bikeUnits
  //       })
  //     },(err=>{
  //       this.toastr.error(err.error)
  //     })
  //   )
  // }

  // Edit(id: string): void {
  //   this.isEditForm = true;
  //   this.editId = id;
  
  //   this.bikeTableService.getBikeById(id).subscribe(
  //     (res: Bike) => {
  //       // Patch form values with the existing bike data
  //       this.bikeForm.patchValue({
  //         brand: res.brand,
  //         model: res.model,
  //         type: res.type,
  //         rentPerHour: res.rentPerHour
  //       });
  
  //       // Clear existing bike units form array and add the existing units
  //       const bikeUnitsArray = this.bikeForm.get('bikeUnits') as FormArray;
  //       bikeUnitsArray.clear(); // Clear any existing bike units
  
  //       // Add each unit from the response to the form
  //       res.bikeUnits.forEach((unit: bikeUnits) => {
  //         bikeUnitsArray.push(this.fb.group({
  //           RegistrationNumber: [unit.registrationNumber, Validators.required],
  //           year: [unit.year, Validators.required],
  //           images: this.fb.array(unit.images ? unit.images.map(image => this.fb.group({
  //             imagePath: [image.imagePath]
  //           })) : [])
  //         }));
  //       });
  //     },
  //     (err) => {
  //       this.toastr.error('Failed to load bike details');
  //     }
  //   );
  // }
  
  Edit(id: string): void {
    this.isEditForm = true;
    this.editId = id;
    console.log(this.editId);
    
  
    // Proceed with fetching bike data by id and patch the form, etc.
    this.bikeTableService.getBikeById(id).subscribe(
      (res: Bike) => {
        this.bikeForm.patchValue({
          brand: res.brand,
          model: res.model,
          type: res.type,
          rentPerHour: res.rentPerHour
        });
  
        const bikeUnitsArray = this.bikeForm.get('bikeUnits') as FormArray;
        bikeUnitsArray.clear(); // Clear any existing bike units
        res.bikeUnits.forEach((unit: bikeUnits) => {
          bikeUnitsArray.push(this.fb.group({
            RegistrationNumber: [unit.registrationNumber, Validators.required],
            year: [unit.year, Validators.required],
            images: this.fb.array(unit.images ? unit.images.map(image => this.fb.group({
              imagePath: [image.imagePath]
            })) : [])
          }));
        });
      },
      (err) => {
        this.toastr.error('Failed to load bike details');
      }
    );
  }
  

}



// openModal(template: TemplateRef<void>) {
//   this.modalRef = this.modalService.show(template);
// }


// this.bikesArray = (this.bikeForm.value);
// const BikeForm = this.bikeForm.value;
// this.bikeForm.value.ratePerHour = parseInt(this.bikeForm.value.ratePerHour)
// this.bikeTableService.postBikes(this.bikesArray).subscribe(data => {
//   this.toastr.success("successfully added", "Success")
//   this.router.navigate(['/admin/bikeTable']);
//   this.bikeForm.reset()
// })


 // modalRef?: BsModalRef;


  // openModal(template: TemplateRef<void>) {
  //   this.modalRef = this.modalService.show(template);
  // }

  // ngOnInit(): void {
  //   this.loadBikes();
  // }


  // loadBikes() {
  //   this.bikeTableService.getBikes().subscribe(data => {
  //     this.bikesArray = data;
  //     console.log(data);
  //   })
  // }
