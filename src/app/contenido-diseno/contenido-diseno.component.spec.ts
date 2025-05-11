import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoDisenoComponent } from './contenido-diseno.component';

describe('ContenidoDisenoComponent', () => {
  let component: ContenidoDisenoComponent;
  let fixture: ComponentFixture<ContenidoDisenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidoDisenoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoDisenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
