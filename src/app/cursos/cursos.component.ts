
import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements AfterViewInit {

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  irAInscripcion() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (usuario && usuario.id_usuario) {
      // Usuario logueado va al formulario de inscripción
      this.router.navigate(['/formulario-inscripcion']);
    } else {
      // No logueado lo dirige a iniciar sesión
      this.router.navigate(['/acceso']);
    }
  }
}
