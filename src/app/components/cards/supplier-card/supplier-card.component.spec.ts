import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierCardComponent } from './supplier-card.component';
import { Supplier } from 'src/app/models/supplier.model';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule

describe('SupplierCardComponent', () => {
  let component: SupplierCardComponent;
  let fixture: ComponentFixture<SupplierCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierCardComponent],
      imports: [MatCardModule], // Import MatCardModule
    });

    fixture = TestBed.createComponent(SupplierCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display supplier details correctly', () => {
    const supplier: Supplier = {
      id: '1',
      branchId: '123',
      name: 'Sample Supplier',
      number: 12345,
      email: 'sample@supplier.com',
      payment_term: 'Net 30',
    };
    component.supplier = supplier;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const cardTitle = element.querySelector('mat-card-title').textContent;
    const cardSubtitle = element.querySelector('mat-card-subtitle').textContent;

    expect(cardTitle).toContain(supplier.id);
    expect(cardSubtitle).toContain(supplier.name);
  });
});
