import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalProcessComponent } from './rental-process.component';

describe('RentalProcessComponent', () => {
  let component: RentalProcessComponent;
  let fixture: ComponentFixture<RentalProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
