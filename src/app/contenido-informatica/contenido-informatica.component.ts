import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contenido-informatica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contenido-informatica.component.html',
  styleUrl: './contenido-informatica.component.css'
})
export class ContenidoInformaticaComponent implements OnInit {
  curso: any;

  ngOnInit() {
    this.curso = {
      nombre: 'Informática',
      modalidad: 'Presencial',
      alumnos: 60,
      fechaInicio: '15/05/2025',
      fechaFin: '30/07/2025',
      unidades: ['Introducción', 'Herramientas básicas', 'Procesadores de texto'],
      proximaClase: { fecha: '15/05/2025', tema: 'Herramientas básicas' },
      materiales: [
        { nombre: 'Programa PDF', link: '/assets/programa-informatica.pdf' },
        { nombre: 'Presentación PPT', link: '/assets/unidad1-informatica.ppt' }
      ],
      mensajes: [
        'Reunión el viernes 18:00 hs.',
        'Consulta sobre la tarea.'
      ]
    };
  }

  editarCurso() {
    alert('Funcionalidad para editar curso');
  }

  subirMaterial() {
    alert('Funcionalidad para subir material');
  }

  verAlumnos() {
    alert('Funcionalidad para ver alumnos');
  }

  enviarMensaje() {
    alert('Funcionalidad para enviar mensaje grupal');
  }
}

