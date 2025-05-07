import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-profe',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-profe.component.html',
  styleUrl: './dashboard-profe.component.css'
})
export class DashboardProfeComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  verCurso(id: number) {
    this.router.navigate(['/curso', id]);
  }

  verPerfil() {
    this.router.navigate(['/perfil']);
  }

  verAlumnos() {
    console.log('Mostrando los alumnos');
  }
}

