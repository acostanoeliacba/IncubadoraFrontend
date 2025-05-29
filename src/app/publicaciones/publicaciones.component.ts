import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Publicacion } from './Publicacion.model';
import { PublicacionService } from './serviciopublicaciones';

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
  private usuarioSubscription?: Subscription;
  private isBrowser: boolean;

  constructor(
    private fb: FormBuilder,
    private publicacionService: PublicacionService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.publicacionForm = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      tipo: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.cargarPublicacionesAsync();

    this.usuarioSubscription = this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
      console.log('Usuario desde AuthService:', usuario);
      this.esDocente = this.authService.esUsuarioDocente();
      console.log('esDocente:', this.esDocente);
    });

    if (this.isBrowser) {
      this.iniciarCarrusel();
    }
  }

  ngOnDestroy(): void {
    if (this.intervaloCarrusel) {
      clearInterval(this.intervaloCarrusel);
    }
    this.usuarioSubscription?.unsubscribe();
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
        this.publicacionForm.reset();
      },
      error: (err) => console.error('Error al crear publicación:', err)
    });
  }

  iniciarCarrusel(): void {
    this.intervaloCarrusel = setInterval(() => {
      if (this.publicaciones.length === 0) return;
      this.currentIndex = (this.currentIndex + 1) % this.publicaciones.length;
    }, 3000);
  }
}
