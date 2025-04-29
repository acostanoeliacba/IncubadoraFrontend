import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OratoriaComponent } from './oratoria.component';

describe('OratoriaComponent', () => {
  let component: OratoriaComponent;
  let fixture: ComponentFixture<OratoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OratoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OratoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
