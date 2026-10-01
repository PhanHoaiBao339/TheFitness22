import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloComponent } from './calo.component';

describe('CaloComponent', () => {
  let component: CaloComponent;
  let fixture: ComponentFixture<CaloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
