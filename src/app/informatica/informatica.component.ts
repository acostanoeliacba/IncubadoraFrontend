import { Component } from '@angular/core';

@Component({
  selector: 'app-informatica',
  standalone: true,
  imports: [],
  templateUrl: './informatica.component.html',
  styleUrl: './informatica.component.css'
})
export class InformaticaComponent {

  inscribir() {
    // Aquí iría la lógica para la inscripción, como redirigir a una página de pago o almacenamiento de datos
    alert('Inscripción realizada con éxito');
  }

}
