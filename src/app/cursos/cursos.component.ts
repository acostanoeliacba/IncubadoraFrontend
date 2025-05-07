import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {

  constructor(private router: Router) {}

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
