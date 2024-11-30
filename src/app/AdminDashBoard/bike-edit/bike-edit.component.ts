import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BikeTableService } from '../../Services/bike-table.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { images } from '../../Models/images';
import { Bike } from '../../Models/bike';

@Component({
  selector: 'app-bike-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './bike-edit.component.html',
  styleUrl: './bike-edit.component.css'
})
export class BikeEditComponent implements OnInit {

  editForm!: FormGroup;
  // currentBike!:Bike;
  @Input() currentBike: any = '';
  images!: images;
  isEditForm: boolean = false;
  currentBikeId: any;
  


  constructor(private fb: FormBuilder, private bikeTableService: BikeTableService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {
    // this.currentBikeId = this.route.snapshot.paramMap.get("id");
    // console.log(this.currentBikeId);

    this.editForm = this.fb.group({
      id: [''],
      brand: ['', [Validators.required]],
      model: [''],
      type: [''],
      rentPerHour: ['', Validators.required],
      bikeUnits: this.fb.array([this.createBikeUnit()])
    });
  }

  // ngOnInit(): void {
  //   if(this.currentBike){
  //     console.log(this.currentBike);
  //   }

  //   this.bikeTableService.getBikeById(this.currentBikeId).subscribe(data => {
  //     this.currentBike = data;
  //     this.editForm.patchValue(data);
  //   })
    
  //   // if (this.editForm) {
  //   //   this.bikeTableService.getBikeById(this.currentBikeId).subscribe(data => {
  //   //     console.log(data);

  //   //     this.currentBike = data;
  //   //     console.log(this.currentBike);
  //   //     this.editForm.patchValue(data);
  //   //   })
  //   // }
   
  // }

  // ngOnInit(): void {
  //   if (this.currentBike && this.currentBike.id) {
  //     console.log(this.currentBike);  // Check if the bike has a valid id
  //     this.editForm.patchValue(this.currentBike);  // Patch form with the current bike details
  //   } else {
  //     this.toastr.error('No bike selected for editing');
  //   }
  // }

  ngOnInit(): void {
    // Assuming you're fetching data from the route parameters
    const bikeId = this.route.snapshot.paramMap.get('id');
    
    if (bikeId) {
      this.bikeTableService.getBikeById(bikeId).subscribe(
        (data) => {
          this.currentBike = data;
          this.editForm.patchValue(data);
        },
        (error) => {
          this.toastr.error('Failed to load bike data');
        }
      );
    } else {
      this.toastr.error('Bike ID is missing');
    }
  }
  
  

  createBikeUnit(): FormGroup {
    return this.fb.group({
      RegistrationNumber: ['', Validators.required],
      year: ['', Validators.required],
      images: this.fb.array([])  // Assuming you might want to add images in the future
    });
  }


  get myBikeUnits(): FormArray {
    return this.editForm.get('bikeUnits') as FormArray;
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


  // Remove a bike unit from the bike form array
  removeCheckList(index: number): void {
    (this.editForm.get('bikeUnits') as FormArray).removeAt(index);
  }



  // Add a new bike unit to the bike form array
  addCheckList(): void {
    (this.editForm.get('bikeUnits') as FormArray).push(this.createBikeUnit());
  }


  // editBike(): void {
  //   if (this.currentBike && this.currentBike.id) {
  //     const bikeId = this.currentBike.id;  // Ensure BikeId is correctly retrieved from currentBike
  //     const bike = this.editForm.value;    // Get the form data (includes bike data to update)
  //     this.bikeTableService.updateBike(bikeId, bike).subscribe(
  //       response => {
  //         this.toastr.success('Bike updated successfully!');
  //         this.router.navigate(['/bike-list']); // Navigate back to bike list or where necessary
  //       },
  //       error => {
  //         this.toastr.error('Error updating bike');
  //       }
  //     );
  //   } else {
  //     this.toastr.error('Invalid bike ID');
  //   }
  // }
  

}
