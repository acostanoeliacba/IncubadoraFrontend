import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, ReactiveFormsModule,  Validators } from '@angular/forms';
import { PerfilService } from './perfilservicio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
    imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfilForm!: FormGroup;
  usuario: any;
  tipoUsuario!: 'alumno' | 'docente';
  cargando: boolean = true;
  modoEdicion: boolean = false;

  constructor(private fb: FormBuilder, private perfilService: PerfilService) {}

  ngOnInit(): void {
    this.tipoUsuario = localStorage.getItem('tipo_usuario') as 'alumno' | 'docente';
    const id_usuario = localStorage.getItem('id_usuario');

    if (!id_usuario || !this.tipoUsuario) {
      alert("Sesión no válida");
      return;
    }

    this.perfilService.obtenerPerfil(this.tipoUsuario, id_usuario).subscribe({
      next: (datos) => {
        this.usuario = datos;
        this.initForm();
        this.cargando = false;
      },
      error: () => {
        alert('Error al cargar el perfil');
        this.cargando = false;
      }
    });
  }

  initForm(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      apellido: [this.usuario.apellido, Validators.required],
      fecha_nacimiento: [this.usuario.fecha_nacimiento, Validators.required],
      direccion: [this.usuario.direccion],
      telefono: [this.usuario.telefono],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      dni: [this.usuario.dni],
      especialidad: [this.usuario.especialidad],
      // foto: [null] // ← aquí irá el campo de imagen de perfil más adelante
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

    const id_usuario = localStorage.getItem('id_usuario');
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
}
