import { Component } from '@angular/core';

@Component({
  selector: 'app-caligrafia',
  standalone: true,
  imports: [],
  templateUrl: './caligrafia.component.html',
  styleUrl: './caligrafia.component.css'
})
export class CaligrafiaComponent {

  inscribir() {
    // Aquí iría la lógica para la inscripción, como redirigir a una página de pago o almacenamiento de datos
    alert('Inscripción realizada con éxito');
  }

}
