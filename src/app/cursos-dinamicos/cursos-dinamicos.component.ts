
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-cursos-dinamicos',
  standalone: true,
  imports: [  RouterModule,CommonModule ],
  templateUrl: './cursos-dinamicos.component.html',
  styleUrls: ['./cursos-dinamicos.component.css']
})

export class CursosDinamicosComponent implements OnInit {
    cursos: any[] = [];
    
    constructor(private http: HttpClient,
                private router: Router,
                private authService: AuthService
                ) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/cursos').subscribe(
      data => {
        console.log("✅ Cursos recibidos:", data);
        this.cursos = data;
      },
      error => {
        console.error('Error al obtener cursos:', error);
      }
    );
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
       // Usuario logueado va al formulario de inscripción
       this.router.navigate(['/formulario-inscripcion']);
     } else {
       // No logueado lo dirige a iniciar sesión
       this.router.navigate(['/acceso']);
     }
   }

  cerrarSesion(): void {
    this.authService.logout();       
    this.router.navigate(['/acceso']);
  }
}
