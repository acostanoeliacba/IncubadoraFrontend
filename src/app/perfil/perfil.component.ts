import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, ReactiveFormsModule,  Validators } from '@angular/forms';
import { PerfilService } from './perfilservicio';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service'; 

import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone:true,
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

  constructor(private fb: FormBuilder, 
              private perfilService: PerfilService,
              private authService: AuthService,
              private router: Router) {}

  // ngOnInit(): void {
  //   this.tipoUsuario = localStorage.getItem('tipo_usuario') as 'alumno' | 'docente';
  //   const id_usuario = localStorage.getItem('id_usuario');

  //   if (!id_usuario || !this.tipoUsuario) {
  //     alert("Sesión no válida");
  //     return;
  //   }

  //   this.perfilService.obtenerPerfil(this.tipoUsuario, id_usuario).subscribe({
  //     next: (datos) => {
  //       this.usuario = datos;
  //       this.initForm();
  //       this.cargando = false;
  //     },
  //     error: () => {
  //       alert('Error al cargar el perfil');
  //       this.cargando = false;
  //     }
  //   });
  // }

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
  this.initForm();  //  formulario con los datos del usuario
  this.cargando = false;

  // Para  más detalles del backend, la llamada aquí
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
