import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaligrafiaComponent } from './caligrafia.component';

describe('CaligrafiaComponent', () => {
  let component: CaligrafiaComponent;
  let fixture: ComponentFixture<CaligrafiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaligrafiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaligrafiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
