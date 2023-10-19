import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceCardComponent } from './invoice-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('InvoiceCardComponent', () => {
  let component: InvoiceCardComponent;
  let fixture: ComponentFixture<InvoiceCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceCardComponent],
      imports: [MatCardModule, MatExpansionModule, MatIconModule, BrowserAnimationsModule], 
    });

    fixture = TestBed.createComponent(InvoiceCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  
});
