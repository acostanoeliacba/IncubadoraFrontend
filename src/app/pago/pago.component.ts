import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeCardElement} from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
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

  constructor(private http: HttpClient, private router: Router) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51RLsAiC5buLPzJLWwH6H0MQbDlQhIahobv55oIK8oGTUuxGPMN1DxR3sFKLq5Lbeox3nrsZMGlhNjUXCcQPuX6kx004uKS6Cy1');
    if (!this.stripe) {
      this.mensaje = 'Error al cargar Stripe';
      this.pagoExitoso = false;
      return;
    }

    this.elements = this.stripe.elements();
    this.card = this.elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.http.post<any>('http://localhost:3000/create-payment-intent', { amount: 1000 }).subscribe(res => {
      this.clientSecret = res.clientSecret;
    });
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
      
    setTimeout(() => {
        this.router.navigate(['/gracias']);
      }, 3000);

    }
  }
}