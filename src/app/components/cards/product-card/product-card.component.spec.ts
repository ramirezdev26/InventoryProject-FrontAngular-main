import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from 'src/app/models/product.model';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      imports: [MatCardModule], // Import MatCardModule
    });

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details correctly', () => {
    const product: Product = {
      id: '1',
      name: 'Sample Product',
      description: 'A sample product description',
      inventoryStock: 10,
      price: 25.99,
      category: 'Sample Category',
      branchId: '123',
    };
    component.product = product;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const cardTitle = element.querySelector('mat-card-title').textContent;
    const cardSubtitle = element.querySelector('mat-card-subtitle').textContent;

    expect(cardTitle).toContain(product.id);
    expect(cardSubtitle).toContain(product.name);
  });
});