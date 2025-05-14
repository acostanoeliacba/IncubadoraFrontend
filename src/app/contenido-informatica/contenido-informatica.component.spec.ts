import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoInformaticaComponent } from './contenido-informatica.component';

describe('ContenidoInformaticaComponent', () => {
  let component: ContenidoInformaticaComponent;
  let fixture: ComponentFixture<ContenidoInformaticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidoInformaticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoInformaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
