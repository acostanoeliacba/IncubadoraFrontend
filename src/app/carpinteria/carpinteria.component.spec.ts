import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpinteriaComponent } from './carpinteria.component';

describe('CarpinteriaComponent', () => {
  let component: CarpinteriaComponent;
  let fixture: ComponentFixture<CarpinteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarpinteriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpinteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
