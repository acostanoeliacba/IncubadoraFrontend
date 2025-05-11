import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PerfilService } from './perfilservicio';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfilForm!: FormGroup;
  usuario: any;
  tipoUsuario!: 'alumno' | 'docente';
  cargando: boolean = true;
  modoEdicion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getUsuario();

    if (!usuario) {
      alert("Sesión no válida");
      this.router.navigate(['/acceso']);
      return;
    }
    console.log(usuario);

    this.usuario = usuario;
    this.tipoUsuario = usuario.tipo_usuario;
    this.initForm();
    this.cargando = false;

    // Si quieres cargar datos frescos del backend, descomenta:
    // this.perfilService.obtenerPerfil(this.tipoUsuario, usuario.id).subscribe(...)
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
      // foto: [null]  // ← campo para imagen en el futuro
    });
  }

  activarEdicion(): void {
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.initForm();
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
