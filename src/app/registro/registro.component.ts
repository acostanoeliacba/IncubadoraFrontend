
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent {

  registroForm: FormGroup;
  registroExitoso: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required, this.validarEdad.bind(this)]],
      pais: ['', Validators.required],
      rol: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  validarEdad(control: any) {
    const fechaNacimiento = new Date(control.value);

    if (isNaN(fechaNacimiento.getTime())) {
      return { invalidDate: true }; 
    }

    const edad = this.calcularEdad(fechaNacimiento);
    if (edad < 18) {
      return { menorDeEdad: true }; 
    }
    return null; 
  }
  
  calcularEdad(fechaNacimiento: Date) {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth();
    if (mes < fechaNacimiento.getMonth() || (mes === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Formulario válido:', this.registroForm.value);
      this.registroExitoso = true;  
      console.log('Flag registroExitoso:', this.registroExitoso);

      
      setTimeout(() => {
        this.router.navigate(['/acceso']);
      }, 2000);  
    } else {
      console.log('Formulario inválido');
    }
  }

  irAlAcceso() {
    this.router.navigate(['/acceso']);
  }
}
