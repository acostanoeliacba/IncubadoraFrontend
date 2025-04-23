import { Component, Inject, PLATFORM_ID, AfterViewInit, Renderer2 } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements AfterViewInit {

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const elementos = this.document.querySelectorAll('.fade-in');

      const mostrarElemento = (elemento: Element) => {
        const rect = elemento.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          this.renderer.addClass(elemento, 'aparecer');
        }
      };

      const revisarElementos = () => {
        elementos.forEach(el => mostrarElemento(el));

        const navbar = this.document.querySelector('.navbar');
        if (navbar) {
          if (window.scrollY > 50) {
            this.renderer.addClass(navbar, 'scroll-navbar');
          } else {
            this.renderer.removeClass(navbar, 'scroll-navbar');
          }
        }
      };

      revisarElementos();
      window.addEventListener('scroll', revisarElementos);
    }
  }
}