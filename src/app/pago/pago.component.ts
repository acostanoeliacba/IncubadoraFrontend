import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeCardElement} from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  @ViewChild('cardElement') cardElement!: ElementRef;

  stripe: Stripe | null = null;
  elements!: StripeElements;
  card!: StripeCardElement;
  clientSecret: string = '';
  cargando = false;
  mensaje = '';
  pagoExitoso = false;
  datosPago: string = '';

  nombreTitular = '';
  nombreCurso: string = '';
  monto: number = 0;
  idUsuario!: number;
  idCurso!: number;
  fechaPago!: string;
  formaPago: string = 'tarjeta'; 
  cursos: any[] = [];


  constructor(private http: HttpClient, 
              private router: Router,
              private authService: AuthService
              ) {}

  async ngOnInit() {
  this.stripe = await loadStripe('pk_test_51RLsAiC5buLPzJLWwH6H0MQbDlQhIahobv55oIK8oGTUuxGPMN1DxR3sFKLq5Lbeox3nrsZMGlhNjUXCcQPuX6kx004uKS6Cy1');

  if (!this.stripe) {
    this.mensaje = 'Error al cargar Stripe';
    this.pagoExitoso = false;
    return;
  }

  this.elements = this.stripe.elements();
  this.card = this.elements.create('card');

  setTimeout(() => {
    this.card.mount(this.cardElement.nativeElement);
  });

  const datosCompraString = localStorage.getItem('datosCompra');

  if (datosCompraString) {
    const datos = JSON.parse(datosCompraString);
    this.monto = datos.costo || 0;
    this.idUsuario = datos.id_usuario;
    this.idCurso = datos.id_curso;
    this.fechaPago = datos.fecha_pago;
    this.nombreTitular = `${datos.nombre} ${datos.apellido}`;

    this.http.get('http://localhost:3000/cursos').subscribe((cursos: any) => {
      this.cursos = cursos;
      const cursoSeleccionado = this.cursos.find(c => Number(c.id_curso) === Number(this.idCurso));
      this.nombreCurso = cursoSeleccionado ? cursoSeleccionado.nombre_curso : 'Curso no encontrado';
    });

    this.http.post<any>('http://localhost:3000/pagos/create-payment-intent', { amount: this.monto })
  .subscribe(res => {
    this.clientSecret = res.clientSecret;
  });

  }
}

async pagar() {
  
  if (!this.stripe || !this.clientSecret) return;

  this.cargando = true;
  this.mensaje = '';

  const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.clientSecret, {
    payment_method: { card: this.card },
  });

  this.cargando = false;

  if (error) {
    this.mensaje = '❌ Error: ' + error.message;
    this.pagoExitoso = false;
  } else if (paymentIntent && paymentIntent.status === 'succeeded') {
    this.mensaje = '✅ ¡Pago exitoso! 🎉';
    this.pagoExitoso = true;
 
    const datosCompraString = localStorage.getItem('datosCompra');
    if (datosCompraString) {
      const datos = JSON.parse(datosCompraString);

      const datosPago = {
        id_usuario: datos.id_usuario,
        id_curso: datos.id_curso,
        monto: datos.costo,
        fecha_pago: datos.fecha_pago,
      };

     this.http.post('http://localhost:3000/pagos',datosPago)  
      .subscribe(
        response =>{
          this.mensaje += '\n ✅ Pago Registrado en base.';
        },
        error => {
          this.mensaje = '⚠️ Pago no registrado';
        }
        );  
      const inscripcionPayload = {
        id_usuario: datos.id_usuario,
        id_curso: datos.id_curso,
        fecha_inscripcion: datos.fecha_pago
      };
 
      this.http.post('http://localhost:3000/inscripciones', inscripcionPayload)
        .subscribe(
          response => {
            console.log('✅ Inscripción guardada');
            localStorage.removeItem('datosCompra');
            this.mensaje += '\n✅ Inscripción registrada.';
            setTimeout(() => {
              console.log('⏩ Redirigiendo a /gracias...');
              this.router.navigate(['/gracias']);
            }, 4000);
          },
          error => {
            console.error('⚠️ Error en /inscripciones:', error);
            this.mensaje = '⚠️ Hubo un error al registrar la inscripción.';
          }
        );

        
    }
  }
}

cerrarSesion(): void {
    this.authService.logout();       
    this.router.navigate(['/acceso']);
  }

}