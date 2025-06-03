import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service'; 

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

import { DialogService } from '../services/dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {

  accesoForm: FormGroup;
  inicioExitoso: boolean = false;
  inicioError: string | null = null;

  // constructor(  private http: HttpClient,
  //               private fb: FormBuilder, 
  //               private router: Router,
  //               private authService: AuthService
  //               ) {
   
  constructor(
              private fb: FormBuilder,
              private authService: AuthService,
              private dialogService: DialogService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object
              ) {
    this.accesoForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }
  

  onSubmit() {
    if (this.accesoForm.valid) {
    const formData = this.accesoForm.value;

    this.http.post('http://localhost:3000/user/easy/login', formData).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
   
        this.authService.setUsuario(response);
        this.inicioExitoso = true;
        this.inicioError = null;
        this.dialogService.showSuccess('Registro Exitoso.').subscribe(() => { this.router.navigate(['/perfil']);});
       
      },
      error: (error) => {
        console.error('Error en el login:', error);
        this.inicioExitoso = false;
        this.inicioError = 'Error al iniciar sesión. Ingresa tus credenciales.';
        this.dialogService.showError('Error al iniciar sesión. Ingresa tus credenciales.').subscribe(() => { });
      }
    });
    } else {
      console.log('Formulario inválido');
      this.inicioExitoso = false;
      this.inicioError = 'Por favor, revisa los errores en el formulario.';
    }
  }

  cerrarSesion(): void {
    this.authService.logout();       
    this.router.navigate(['/acceso']);
  }

  accederConGitHub() {
  window.location.href = 'http://localhost:3000/user/login'; 
 
}
  irAlRegistro() {
    this.router.navigate(['/registro']);
  }
}