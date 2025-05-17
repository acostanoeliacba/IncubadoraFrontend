import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, ReactiveFormsModule,  Validators } from '@angular/forms';
import { PerfilService } from './perfilservicio';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service'; 

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, HttpClientModule,ReactiveFormsModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfilForm!: FormGroup;
  usuario: any;
  tipoUsuario!: 'alumno' | 'docente';
  cargando: boolean = true;
  modoEdicion: boolean = false;

  cargandoCursos: boolean = true;
  cursosInscriptos: any;
  userId: any;
  constructor(private fb: FormBuilder,
              private perfilService: PerfilService,
              private authService: AuthService,
              private router: Router,
              private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object
              ) {}
  get fotoUrl(): string {
    return this.usuario?.foto ? `http://localhost:3000${this.usuario.foto}` : '';
  }
   
  ngOnInit(): void {
      const usuario = this.authService.getUsuario();


      if (!usuario && isPlatformBrowser(this.platformId)) {
        alert("Sesión no válida");
        //this.snackBar.open("Sesión no válida", "Cerrar", { duration: 3000 });
        setTimeout(() => {
          this.router.navigate(['/acceso']);
        }, 500);
        return;
      }

      console.log("perfil de usuario:", usuario);
      this.usuario = usuario;

      if (this.fotoUrl) {
          console.log("URL de la foto:", this.fotoUrl);
        } else {
          console.warn("No hay foto para mostrar.");
      }

      if (usuario && usuario.tipo_usuario) {
        console.log("Tipo de usuario:", usuario.tipo_usuario);
        this.tipoUsuario = usuario.tipo_usuario;
        this.userId = usuario.id_usuario;

        if (this.userId) {
          console.log(`📡 Solicitando inscripciones desde: http://localhost:3000/inscripciones/cursos${this.userId}`);

          this.http.get<any[]>(`http://localhost:3000/inscripciones/cursos/${this.userId}`).subscribe(
            data => {
              console.log("✅ Inscripciones recibidas:", data);
             
             if (Array.isArray(data) && data.length > 0) {
                  data.forEach((inscripcion, i) => {
                  const nombreCurso = inscripcion?.curso?.nombre_curso;
                  console.log(`📘 Curso #${i + 1}: ${nombreCurso ?? 'Sin nombre de curso'}`);
              });

              } else {
                  console.warn("⚠️ Inscripciones no encontradas.");
              }

              this.cursosInscriptos = data;
              this.cargandoCursos = false;
            },
            error => {
              console.error("❌ Error al cargar las inscripciones:", error);
              this.cargandoCursos = false;
            }
          );
        } else {
          console.warn("⚠️ ID de usuario no encontrado.");
        }

        this.initForm(); 
        this.cargando = false;

      } else {
        console.warn("⚠️ Usuario no encontrado o inválido");
      }
  }

  initForm(): void {
    if ((!this.usuario || !this.usuario.nombre) && isPlatformBrowser(this.platformId )) {
    //if (!this.usuario || !this.usuario.nombre) {
      alert("Sesión no válida");
      setTimeout(() => {
        this.router.navigate(['/acceso']);
      }, 500);
      return;
    }
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      apellido: [this.usuario.apellido, Validators.required],
      fecha_nacimiento: [this.usuario.fecha_nacimiento, Validators.required],
      direccion: [this.usuario.direccion],
      telefono: [this.usuario.telefono],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      dni: [this.usuario.dni],
      especialidad: [this.usuario.especialidad],
      foto: [null] 
    });
  }

  activarEdicion(): void {
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.initForm(); // restaurar valores originales
  }

  guardarCambios(): void {
    if (this.perfilForm.invalid) return;
    //const id_usuario = localStorage.getItem('id_usuario');
    const usuario = this.authService.getUsuario();
    const id_usuario = usuario.id_usuario

    if (!id_usuario) return;

    this.perfilService.actualizarPerfil(this.tipoUsuario, id_usuario, this.perfilForm.value).subscribe({
      next: (res) => {
        this.usuario = res;
        this.modoEdicion = false;
        alert('Perfil actualizado correctamente');
      },
      error: () => {
        alert('Error al actualizar perfil');
      }
    });
  }

  cerrarSesion(): void {
    this.authService.logout();       
    this.router.navigate(['/acceso']);
  }

}
