import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikesDetailsComponent } from './bikes-details.component';

describe('BikesDetailsComponent', () => {
  let component: BikesDetailsComponent;
  let fixture: ComponentFixture<BikesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BikesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
