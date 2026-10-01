import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrtComponent } from './prt.component';

describe('PrtComponent', () => {
  let component: PrtComponent;
  let fixture: ComponentFixture<PrtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
