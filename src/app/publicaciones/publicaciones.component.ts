import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Publicacion } from './Publicacion.model';
import { PublicacionService } from './serviciopublicaciones';
import { AuthService } from '../services/auth.service';

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

import { DialogService } from '../services/dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: 'publicaciones.component.html',
  styleUrls: ['publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit, OnDestroy {
  publicaciones: Publicacion[] = [];
  publicacionForm: FormGroup;
  currentIndex = 0;
  intervaloCarrusel: any;
  esDocente = false;
  usuario: any = null;
  tipoUsuario: string | null = null;
  private isBrowser: boolean;

  // Modal
  mostrarModal = false;
  publicacionSeleccionada: Publicacion | null = null;

  constructor(
    private fb: FormBuilder,
    private publicacionService: PublicacionService,
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService,
    private http: HttpClient,  
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.publicacionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      contenido: ['', [Validators.required, Validators.minLength(10)]],
      tipo: ['', [Validators.required, Validators.pattern('^(curso|capacitacion|entrenamiento)$')]],
      estado: ['', [Validators.required, Validators.pattern('^(activo|inactivo)$')]]
    });
  }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
    this.tipoUsuario = this.usuario?.tipo_usuario;
    this.esDocente = this.tipoUsuario === 'docente' || this.tipoUsuario === 'admin';
        console.log('Usuario:', this.usuario);
        console.log('Es docente:', this.esDocente);
    this.cargarPublicacionesAsync();
     if (this.isBrowser) {
          this.iniciarCarrusel();
      }
  }


  ngOnDestroy(): void {
    if (this.intervaloCarrusel) {
      clearInterval(this.intervaloCarrusel);
    }
  }

  cargarPublicacionesAsync(): Promise<void> {
    return new Promise((resolve) => {
      this.publicacionService.getPublicaciones().subscribe({
        next: (data) => {
          this.publicaciones = data;
          this.currentIndex = 0;
          resolve();
        },
        error: (err) => {
          console.error(err);
          resolve();
        }
      });
    });
  }

  crearPublicacion(): void {
    if (this.publicacionForm.invalid) {
      return;
    }

    const nuevaPublicacion = {
      titulo: this.publicacionForm.value.titulo,
      contenido: this.publicacionForm.value.contenido,
      tipo: this.publicacionForm.value.tipo,
      estado: this.publicacionForm.value.estado

    };

    this.publicacionService.crearPublicacion(nuevaPublicacion).subscribe({
      next: () => {
        this.cargarPublicacionesAsync();
        this.dialogService.showSuccess('Publicación creada exitosamente').subscribe(() => {
          this.publicacionForm.reset();
        });
      },
      error: (err) => {
        console.error('Error al crear publicación:', err);
        this.dialogService.showError('Error al crear publicación').subscribe(() => {});
      }
    });
  }

  iniciarCarrusel(): void {
    this.intervaloCarrusel = setInterval(() => {
      if (this.publicaciones.length === 0) return;
      this.currentIndex = (this.currentIndex + 1) % this.publicaciones.length;
    }, 3000);
  }

  // Métodos del modal
  abrirModal(publicacion: Publicacion): void {
    this.publicacionSeleccionada = publicacion;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.publicacionSeleccionada = null;
  }
}
