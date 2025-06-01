import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-gracias',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './gracias.component.html',
  styleUrl: './gracias.component.css'
})


export class GraciasComponent implements OnInit {
  idInscripcion!: number;
  inscripcion: any;
  id_curso!: number;

  constructor(private route: ActivatedRoute, 
              private http: HttpClient, 
              private router: Router,
              private authService: AuthService
              ) {}


  ngOnInit() {

    const idParam = this.route.snapshot.paramMap.get('id_curso');
    this.id_curso = idParam ? Number(idParam) : 0;
    console.log('paremetro id curso recibido',this.id_curso);
    if (!this.id_curso) {
      console.error(' ID de curso no válido');
       setTimeout(() => {
          this.router.navigate(['/curso/contenido', this.id_curso]);
        }, 2000);
      return;
    }
  }
}
