import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBranchFormComponent } from './add-branch-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';

describe('AddBranchFormComponent', () => {
  let component: AddBranchFormComponent;
  let fixture: ComponentFixture<AddBranchFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBranchFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule, // Import MatFormFieldModule
        MatInputModule, // Import MatInputModule
        MatButtonModule, // Import MatButtonModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: '1',
              },
            },
          },
        },
        {
          provide: InventoryService,
          useValue: {
            postNewBranch: jasmine.createSpy('postNewBranch'),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(AddBranchFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the form correctly', () => {
    const element = fixture.nativeElement;
    const form = element.querySelector('form');
    const formInputs = element.querySelectorAll('mat-form-field');
    const buttons = element.querySelectorAll('button');

    expect(form).toBeTruthy();
    expect(formInputs.length).toBe(3);
    expect(buttons.length).toBe(2);
  });

  it('should call onSubmit method when Save button is clicked', () => {
    const inventoryService = TestBed.inject(InventoryService) as jasmine.SpyObj<InventoryService>;
    spyOn(component, 'onSubmit').and.callThrough();
    const submitButton = fixture.nativeElement.querySelector('button[color="primary"]');

    submitButton.click();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(inventoryService.postNewBranch).toHaveBeenCalledWith(component.productForm.value);
  });
});
