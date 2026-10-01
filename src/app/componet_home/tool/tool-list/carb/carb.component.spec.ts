import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbComponent } from './carb.component';

describe('CarbComponent', () => {
  let component: CarbComponent;
  let fixture: ComponentFixture<CarbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
