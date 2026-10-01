import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlavorOrColorComponent } from './admin-flavor-or-color.component';

describe('AdminFlavorOrColorComponent', () => {
  let component: AdminFlavorOrColorComponent;
  let fixture: ComponentFixture<AdminFlavorOrColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFlavorOrColorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFlavorOrColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
