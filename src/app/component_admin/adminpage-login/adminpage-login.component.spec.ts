import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpageLoginComponent } from './adminpage-login.component';

describe('AdminpageLoginComponent', () => {
  let component: AdminpageLoginComponent;
  let fixture: ComponentFixture<AdminpageLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpageLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpageLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
