import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewFromComponent } from './user-new-from.component';

describe('UserNewFromComponent', () => {
  let component: UserNewFromComponent;
  let fixture: ComponentFixture<UserNewFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNewFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNewFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
