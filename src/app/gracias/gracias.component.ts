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
  idCurso!: number;

  constructor(private route: ActivatedRoute, 
              private http: HttpClient, 
              private router: Router,
              private authService: AuthService
              ) {}


  ngOnInit() {
    this.idCurso = Number(this.route.snapshot.paramMap.get('id_curso'));

    setTimeout(() => {
      this.router.navigate(['/curso/contenido', this.idCurso]);
    }, 4000);
  }
}
