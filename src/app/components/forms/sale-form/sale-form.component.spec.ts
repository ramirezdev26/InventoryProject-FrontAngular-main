import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaleFormComponent } from './sale-form.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

describe('SaleFormComponent', () => {
  let component: SaleFormComponent;
  let fixture: ComponentFixture<SaleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleFormComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
        HttpClientModule,
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('token');
            },
          },
        }),
      ],
      providers: [
        InventoryService,
        JwtHelperService,
      ],
    });

    fixture = TestBed.createComponent(SaleFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
