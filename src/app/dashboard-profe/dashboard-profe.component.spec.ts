import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProfeComponent } from './dashboard-profe.component';

describe('DashboardProfeComponent', () => {
  let component: DashboardProfeComponent;
  let fixture: ComponentFixture<DashboardProfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProfeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
