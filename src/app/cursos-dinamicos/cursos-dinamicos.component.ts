
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { CommonModule, ViewportScroller } from '@angular/common'; 

@Component({
  selector: 'app-cursos-dinamicos',
  standalone: true,
  imports: [  RouterModule, CommonModule ],
  templateUrl: './cursos-dinamicos.component.html',
  styleUrls: ['./cursos-dinamicos.component.css']
})

export class CursosDinamicosComponent implements OnInit {
    cursos: any[] = [];
    
  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute,             
              private viewportScroller: ViewportScroller 
              ) {}

  ngOnInit(): void {

    this.http.get<any[]>('http://localhost:3000/cursos').subscribe(
      data => {
       console.log("✅ Cursos recibidos:", data);

        this.cursos = data.map(curso => ({
          ...curso,
          id_fragmento: this.generarFragmento(curso.nombre_curso)
        }));

        setTimeout(() => {
          this.route.fragment.subscribe(fragment => {
            if (fragment) {
              console.log("🧭 Navegando al fragmento:", fragment);
              this.viewportScroller.scrollToAnchor(fragment);
            }
          });
        }, 100);
      },
      error => {
        console.error('❌ Error al obtener cursos:', error);
      }
    );
  }
  
  generarFragmento(nombre: string): string {
    return nombre.toLowerCase()
                 .normalize('NFD')                      
                 .replace(/[\u0300-\u036f]/g, '')       
                 .replace(/[^a-z0-9]/g, '');            
  }

  irAInscripcion (idCurso: number) {
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
       this.router.navigate(['/formulario-inscripcion'], { queryParams: { id_curso: idCurso } });
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
