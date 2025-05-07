import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesPorCursoComponent } from './inscripciones-por-curso.component';

describe('InscripcionesPorCursoComponent', () => {
  let component: InscripcionesPorCursoComponent;
  let fixture: ComponentFixture<InscripcionesPorCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionesPorCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionesPorCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
