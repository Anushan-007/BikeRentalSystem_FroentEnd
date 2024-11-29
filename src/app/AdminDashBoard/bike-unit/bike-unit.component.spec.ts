import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeUnitComponent } from './bike-unit.component';

describe('BikeUnitComponent', () => {
  let component: BikeUnitComponent;
  let fixture: ComponentFixture<BikeUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BikeUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
