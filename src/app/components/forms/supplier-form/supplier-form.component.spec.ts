import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierFormComponent } from './supplier-form.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';


describe('SupplierFormComponent', () => {
  let component: SupplierFormComponent;
  let fixture: ComponentFixture<SupplierFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [InventoryService, AuthService,
        { provide: JwtHelperService, useValue: { decodeToken: () => {} } },
      ],
    });

    fixture = TestBed.createComponent(SupplierFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


});
