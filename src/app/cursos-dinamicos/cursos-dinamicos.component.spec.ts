import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosDinamicosComponent } from './cursos-dinamicos.component';

describe('CursosDinamicosComponent', () => {
  let component: CursosDinamicosComponent;
  let fixture: ComponentFixture<CursosDinamicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosDinamicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosDinamicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
