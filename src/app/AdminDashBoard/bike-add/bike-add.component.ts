import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { images } from '../../Models/images';
import { BikeTableService } from '../../Services/bike-table.service';
import { Bike } from '../../Models/bike';
import { bikeUnits } from '../../Models/bikeUnit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bike-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './bike-add.component.html',
  styleUrl: './bike-add.component.css'
})
export class BikeAddComponent {


  bikeForm!: FormGroup;
  bikesArray: Bike[] = [];
  bikes!: Bike;
  bikeUnits !: bikeUnits;
  images!: images;
  selectedFile: File | null = null;
  selected: any;

  loading: boolean = true;
  error: string | null = null;
  unit: any;

  constructor(private fb: FormBuilder, private bikeTableService: BikeTableService, private toastr: ToastrService, private router: Router, ) {
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



  addBike(): void {
    if (this.bikeForm.valid) {
      const bikeData = this.bikeForm.value;

      // Send the bike details request
      this.bikeTableService.postBikeData(bikeData).subscribe(
        (response) => {
          this.toastr.success('Bike added successfully!');

          response.bikeUnits.forEach((unit: any) => {
            const unitId = unit.unitId;  // Get the bike ID from the response
            this.uploadImages(unitId);   // Proceed to upload images after bike data is saved)
          });
        },
        (error) => {
          this.toastr.error('Failed to add bike');
        }
      );
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



  onDeleteBike() {


  }

}
