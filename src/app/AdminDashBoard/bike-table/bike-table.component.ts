import { Component, OnInit } from '@angular/core';
import { Bike } from '../../Models/bike';
import { BikeTableService } from '../../Services/bike-table.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { bikeUnits } from '../../Models/bikeUnit';
import { images } from '../../Models/images';

@Component({
  selector: 'app-bike-table',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './bike-table.component.html',
  styleUrl: './bike-table.component.css'
})
export class BikeTableComponent implements OnInit{

  bikeForm!:FormGroup;
  editForm!:FormGroup;
  bikesArray:Bike[] = [];
  bikes!:Bike;
  bikeUnits !: bikeUnits;
  images!:images
  selectedFile: File | null = null;


  loading: boolean = true;
  error: string | null = null;
unit: any;

  constructor(private fb:FormBuilder, private bikeTableService:BikeTableService, private toastr: ToastrService, private router:Router){
    this.bikeForm = this.fb.group({
      id: [''],
      brand: ['', [Validators.required]],
      model: [''],
      type: [''],
      bikeUnits: this.fb.array([this.createBikeUnit()])
    });
  }

  createBikeUnit(): FormGroup {
    return this.fb.group({
      RegistrationNumber: ['', Validators.required],
      year: ['', Validators.required],
      rentPerDay: ['', Validators.required],
      images: this.fb.array([])  // Assuming you might want to add images in the future
    });
  }



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }


  // ngOnInit(): void {
  //   this.loadBikes();
  // }


  // loadBikes() {
  //   this.bikeTableService.getBikes().subscribe(data => {
  //     this.bikesArray = data;
  //     console.log(data);
  //   })
  // }



  ngOnInit(): void {
    this.getBikes();
  }


  getBikes(){
    this.bikeTableService.getAllBikes().subscribe({
      next: (data) => {
        console.log(data);
        
        this.bikesArray = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load bikes';
        this.loading = false;}
  })
}



  // getBikes(): void {
  //   this.loading = true;
  //   this.bikeTableService.getAllBikes(this.pagenumber, this.pagesize).subscribe(
  //     (response: any) => {
  //       this.bikes = response; // Adjust according to your API response
  //       // If your API returns pagination data, handle it here
  //       this.loading = false;
  //     },
  //     (error) => {
  //       console.error(error);
  //       this.loading = false;
  //     }
  //   );
  // }

  // onPageChange(page: number): void {
  //   this.pagenumber = page;
  //   this.getBikes();
  // }


  // addBike() {
  //   if (this.bikeForm.invalid || !this.selectedFile) {
  //     return;  // Don't submit if the form is invalid or no file is selected
  //   }
  
  //   const formData = new FormData();
  
  //   // Append form values to FormData (excluding the image, since it's handled separately)
  //   Object.keys(this.bikeForm.value).forEach(key => {
  //     if (key !== 'image') {
  //       formData.append(key, this.bikeForm.get(key)?.value);
  //     }
  //   });
  
  //   // Append the image file
  //   formData.append('image', this.selectedFile, this.selectedFile.name);
  
  //   // Call the service to send the form data to the backend
  //   this.bikeTableService.postBikes(formData).subscribe(
  //     (response: any) => {
  //       console.log(response);
        
  //       this.toastr.success('Successfully added', 'Success');
  //       this.router.navigate(['/admin/bikeTable']);
  //       this.bikeForm.reset();
  //     },
  //     (error: any) => {
  //       this.toastr.error('Post Failed', error);
  //     }
  //   );
  // }


  // addBike(){
   
  //   this.bikes = (this.bikeForm.value);
  //   this.bikeTableService.postBikes(this.bikes).subscribe(data => {
  //     this.toastr.success("successfully added", "Success")
  //     this.router.navigate(['/admin/bikeTable']);
  //   })

  // }


  // Handle the save functionality (Submit form data)
  addBike(): void {
    if (this.bikeForm.valid) {
      const bikeData = this.bikeForm.value;
      this.bikeTableService.postBikes(bikeData).subscribe(
        (response) => {
          this.toastr.success('Bike added successfully!');
          this.router.navigate(['/admin/bikeTable']);  // Redirect to the bike list page
        },
        (error) => {
          this.toastr.error('Failed to add bike');
        }
      );
    } else {
      this.toastr.warning('Please fill in all required fields');
    }
  }



  // get myBikeUnits(): FormArray {
  //   return this.bikeForm.get('bikeUnits') as FormArray;
  // }

  get myBikeUnits(): FormArray {
    return this.bikeForm.get('bikeUnits') as FormArray;
  }
  

  // removeCheckList(index:number){

  //   this.myBikeUnits.removeAt(index);

  // }         
  
    // Remove a bike unit from the bike form array
    removeCheckList(index: number): void {
      (this.bikeForm.get('bikeUnits') as FormArray).removeAt(index);
    }
  

  // addCheckList(){
  //   this.myBikeUnits.push(this.fb.group({                          
  //     RegistrationNumber : [''],
  //     year :[''],
  //     rentPerDay:['']
      
  //   }))
  // }

    // Add a new bike unit to the bike form array
    addCheckList(): void {
      (this.bikeForm.get('bikeUnits') as FormArray).push(this.createBikeUnit());
    }

  onEditTask() {
    let bike = (this.editForm.value);
    this.bikeTableService.editTask(bike , this.bikes ? this.bikes.id : 0 ).subscribe(data => {
      this.toastr.success('successfully updated', 'Success');
      this.router.navigate(['/adminbikeTable']);
    });

  
}



// Method to handle image file input
onImageChange(event: any, unitIndex: number): void {
  const imageFiles = event.target.files;
  const imagesFormArray = (this.myBikeUnits.at(unitIndex).get('images') as FormArray);

  // Loop through selected image files and add to the form array
  for (let i = 0; i < imageFiles.length; i++) {
    const imageFile = imageFiles[i];
    imagesFormArray.push(this.fb.group({
      imagePath: [imageFile.name]  // Save the file name or you can process the file path later
    }));
  }
}



}


 

 // this.bikesArray = (this.bikeForm.value);
    // const BikeForm = this.bikeForm.value;
    // this.bikeForm.value.ratePerHour = parseInt(this.bikeForm.value.ratePerHour)
    // this.bikeTableService.postBikes(this.bikesArray).subscribe(data => {
    //   this.toastr.success("successfully added", "Success")
    //   this.router.navigate(['/admin/bikeTable']);
    //   this.bikeForm.reset()
    // })