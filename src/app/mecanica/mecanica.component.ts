import { Component } from '@angular/core';

@Component({
  selector: 'app-mecanica',
  standalone: true,
  imports: [],
  templateUrl: './mecanica.component.html',
  styleUrl: './mecanica.component.css'
})
export class MecanicaComponent {

  inscribir() {
    // Aquí iría la lógica para la inscripción, como redirigir a una página de pago o almacenamiento de datos
    alert('Inscripción realizada con éxito');
  }

}
