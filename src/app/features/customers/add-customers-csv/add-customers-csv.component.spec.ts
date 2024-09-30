import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomersCsvComponent } from './add-customers-csv.component';

describe('AddCustomersCsvComponent', () => {
  let component: AddCustomersCsvComponent;
  let fixture: ComponentFixture<AddCustomersCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomersCsvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomersCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
