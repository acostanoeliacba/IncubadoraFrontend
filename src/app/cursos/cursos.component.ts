
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {
  cursos: any[] = [];
  
  constructor(private router: Router,
              private http: HttpClient,
              private authService: AuthService
             ) {}

  ngOnInit() {
    this.cargarCursos();

  }
  cargarCursos() {
    this.http.get('http://localhost:3000/cursos').subscribe((data: any) => {
      this.cursos = data;
    });
  }
  irAInscripcion() {
    const usuario = this.authService.getUsuario();
    console.log("usuario almacenado inscripcion cursos",usuario);

    if (!usuario) {
        alert("Sesión no válida");
        setTimeout(() => {
          this.router.navigate(['/acceso']);
          }, 500);
        return
    }
  
    if (usuario) {
      this.router.navigate(['/formulario-inscripcion']);
    } else {
      this.router.navigate(['/acceso']);
    }
  }
  cerrarSesion(): void {
    this.authService.logout();       
    this.router.navigate(['/acceso']);
  }
}

