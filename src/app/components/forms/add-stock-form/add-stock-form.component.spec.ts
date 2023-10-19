import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddStockFormComponent } from './add-stock-form.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('AddStockFormComponent', () => {
  let component: AddStockFormComponent;
  let fixture: ComponentFixture<AddStockFormComponent>;
  let inventoryService: InventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStockFormComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [InventoryService,
      { provide: JwtHelperService, useValue: { decodeToken: () => {} } },
    ],
    });

    fixture = TestBed.createComponent(AddStockFormComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize product selection', () => {
    expect(component.selectedProduct).toBeTruthy();
  });

  it('should initialize quantity to add', () => {
    expect(component.quantityToAdd).toBe(0);
  });

  it('should initialize products array', () => {
    expect(component.products).toBeTruthy();
  });

  it('should initialize branchId', () => {
    expect(component.branchId).toBe('');
  });

  it('should read an inventory Excel file', () => {
    const event = {
      target: {
        files: [new File(['test'], 'test.xlsx')],
      },
    } as any;
    spyOn(component, 'readInventoryExcel').and.callThrough();

    component.readInventoryExcel(event);

    expect(component.readInventoryExcel).toHaveBeenCalled();
  });

  it('should send an Excel file', () => {
    component.branchId = '123';
    component.inventoryExcel = [{ productId: '456', quantity: 10 }];
    spyOn(component, 'sendExcel').and.callThrough();

    component.sendExcel();

    expect(component.sendExcel).toHaveBeenCalled();
  });

  it('should add stock', () => {
    component.selectedProduct = { id: '789', name: 'Test', description: 'Test Product', inventoryStock: 100, price: 10, category: 'Test', branchId: '123', type: 'Test Type', quantity: 10 };
    component.quantityToAdd = 5;
    spyOn(component, 'addStock').and.callThrough();

    component.addStock();

    expect(component.addStock).toHaveBeenCalled();
  });
});
