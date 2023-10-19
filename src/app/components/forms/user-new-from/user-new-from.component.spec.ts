import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserNewFromComponent } from './user-new-from.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';

describe('UserNewFromComponent', () => {
  let component: UserNewFromComponent;
  let fixture: ComponentFixture<UserNewFromComponent>;

  const activatedRoute = {
    snapshot: {
      paramMap: {
        get: () => '123', 
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserNewFromComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        InventoryService,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: JwtHelperService, useValue: { decodeToken: () => {} } },
      ],
    });

    fixture = TestBed.createComponent(UserNewFromComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the branchId', () => {
    component.ngOnInit();
    expect(component.branchId).toEqual('123'); 
  });

  it('should create a product form', () => {
    component.ngOnInit();
    expect(component.productForm).toBeTruthy();
  });


});
