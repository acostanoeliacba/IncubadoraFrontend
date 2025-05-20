
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Publicacion } from './Publicacion.model';
import { PublicacionService } from './serviciopublicaciones';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  publicacionForm: FormGroup;
  imagenSeleccionada: File | null = null;

  constructor(
    private fb: FormBuilder,
    private publicacionService: PublicacionService,
    private authService: AuthService
  ) {
    this.publicacionForm = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      tipo: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarPublicaciones();
  }

  get esDocente(): boolean {
    return this.authService.esDocente();
  }

  cargarPublicaciones(): void {
    this.publicacionService.getPublicaciones().subscribe({
      next: (data) => (this.publicaciones = data),
      error: (err) => console.error('Error al cargar publicaciones', err)
    });
  }

  onArchivoSeleccionado(event: Event): void {
    const archivo = (event.target as HTMLInputElement).files?.[0] || null;
    this.imagenSeleccionada = archivo;
  }

  crearPublicacion(): void {
    if (this.publicacionForm.valid) {
      const formData = new FormData();
      formData.append('titulo', this.publicacionForm.value.titulo);
      formData.append('contenido', this.publicacionForm.value.contenido);
      formData.append('tipo', this.publicacionForm.value.tipo);
      formData.append('estado', this.publicacionForm.value.estado);
      if (this.imagenSeleccionada) {
        formData.append('imagen', this.imagenSeleccionada);
      }

      this.publicacionService.crearPublicacion(formData).subscribe({
        next: () => {
          this.publicacionForm.reset();
          this.imagenSeleccionada = null;
          this.cargarPublicaciones();
        },
        error: (err) => console.error('Error al crear publicación', err)
      });
    }
  }
}
