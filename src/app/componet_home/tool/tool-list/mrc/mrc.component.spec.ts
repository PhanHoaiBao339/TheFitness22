import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrcComponent } from './mrc.component';

describe('MrcComponent', () => {
  let component: MrcComponent;
  let fixture: ComponentFixture<MrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
