import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeAddComponent } from './bike-add.component';

describe('BikeAddComponent', () => {
  let component: BikeAddComponent;
  let fixture: ComponentFixture<BikeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BikeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
