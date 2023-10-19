import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BranchCardComponent } from './branch-card.component';
import { Branch } from 'src/app/models/branch.model';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';
import { MatCardModule } from '@angular/material/card';

describe('BranchCardComponent', () => {
  let component: BranchCardComponent;
  let fixture: ComponentFixture<BranchCardComponent>;
  let mockRouter: Partial<Router>;
  let inventoryService: jasmine.SpyObj<InventoryService>;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    const inventoryServiceSpy = jasmine.createSpyObj('InventoryService', ['setCurrentBranchId']);

    TestBed.configureTestingModule({
      declarations: [BranchCardComponent],
      imports: [MatCardModule], // Import MatCardModule
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: InventoryService, useValue: inventoryServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(BranchCardComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService) as jasmine.SpyObj<InventoryService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update branch ID', () => {
    const branch: Branch = {
      id: '123',
      name: 'Branch Name',
      country: 'Country Name',
      city: 'City Name'
    };

    component.branch = branch;
    component.updateBranchId();

    expect(localStorage.getItem('branchid')).toBe('123');
    expect(inventoryService.setCurrentBranchId).toHaveBeenCalledWith('123');
  });
});