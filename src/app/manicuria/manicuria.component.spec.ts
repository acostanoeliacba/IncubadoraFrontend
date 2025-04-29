import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManicuriaComponent } from './manicuria.component';

describe('ManicuriaComponent', () => {
  let component: ManicuriaComponent;
  let fixture: ComponentFixture<ManicuriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManicuriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManicuriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
