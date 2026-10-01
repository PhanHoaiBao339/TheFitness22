import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityAndRoleComponent } from './authority-and-role.component';

describe('AuthorityAndRoleComponent', () => {
  let component: AuthorityAndRoleComponent;
  let fixture: ComponentFixture<AuthorityAndRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorityAndRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorityAndRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
