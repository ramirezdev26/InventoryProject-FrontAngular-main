import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';
import { MatCardModule } from '@angular/material/card'; // Import the MatCardModule

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let inventoryService: jasmine.SpyObj<InventoryService>;

  beforeEach(() => {
    const inventoryServiceSpy = jasmine.createSpyObj('InventoryService', ['patchChangeUserRole']);
    TestBed.configureTestingModule({
      declarations: [UserCardComponent],
      providers: [
        { provide: InventoryService, useValue: inventoryServiceSpy }
      ],
      imports: [MatCardModule], 
    });

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService) as jasmine.SpyObj<InventoryService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});