
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { PagosService, Pago } from '../services/pagos.service';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import { AuthService } from '../services/auth.service'; 
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-pagos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule, RouterModule],
  templateUrl: './pagos-admin.component.html',
  styleUrls: ['./pagos-admin.component.css']
})
export class PagosAdminComponent implements OnInit {
  loading: boolean = true;
  isBrowser = false;
  pagos: Pago[] = [];
  pagosFiltrados: Pago[] = [];
  cursos: { id: number, nombre: string }[] = [];
  cursoSeleccionado: string = '';
  usuarioFiltro: string = '';
  totalRecaudado: number = 0;


  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Recaudación por curso ($)',
        backgroundColor: '#4CAF50'
      }
    ]
  };
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'black'  
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'black' 
        },
        title: {
          display: true,
          text: 'Cursos',
          color: 'black'
        }
      },
      y: {
        ticks: {
          color: 'black' 
        },
        title: {
          display: true,
          text: 'Monto ($)',
          color: 'black'
        }
      }
    }
  };


 

chartMensualData: ChartData<'line'> = {
  labels: [],
  datasets: [
    {
      data: [],
      label: 'Ingresos por mes ($)',
      backgroundColor: '#2196F3',
      borderColor: '#2196F3',
      fill: false,
      tension: 0.3
    }
  ]
};

chartMensualOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: 'black' 
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'black'
      },
      grid: {
        color: 'black'
      },
      title: {
        display: true,
        text: 'Mes',
        color: 'black'
      }
    },
    y: {
      ticks: {
        color: 'black'
      },
      grid: {
        color: 'black'
      },
      title: {
        display: true,
        text: 'Ingresos ($)',
        color: 'black'
      }
    }
  }
};
  constructor(
    private pagosService: PagosService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.pagosService.obtenerPagos().subscribe((data) => {
        this.pagos = data;
        console.log('Pagos:', this.pagos)
        this.pagosFiltrados = data;
        console.log('Pagos:', this.pagosFiltrados)
        this.extraerCursos();
        this.actualizarGraficos();
        this.loading = false;
      });
    }
  }

extraerCursos() {
  const idsUnicos = Array.from(new Set(this.pagos.map(p => p.id_curso)));

  this.cursos = idsUnicos.map(id => ({
    id,
    nombre: `Curso ${id}` // O nombre real 
  }));

  console.log('Cursos únicos extraídos:', this.cursos);
}



filtrarPagos() {
  this.pagosFiltrados = this.pagos.filter(p =>
    (this.cursoSeleccionado === '' || p.id_curso === +this.cursoSeleccionado) &&
    (this.usuarioFiltro === '' || String(p.id_usuario).includes(this.usuarioFiltro))
  );

  this.actualizarGraficos();
}


  obtenerNombreCursoPorId(id: number): string {
    const curso = this.cursos.find(c => c.id === id);
    return curso ? curso.nombre : '';
  }

actualizarGraficos() {
  // Total recaudado
  this.totalRecaudado = this.pagosFiltrados.reduce((total, pago) => total + +pago.monto, 0);

  // Gráfico por curso (usando id_curso como "nombre temporal")
  const recaudacionPorCurso = this.pagosFiltrados.reduce((acc, pago) => {
    const nombreCurso = `Curso ${pago.id_curso}`; // temporal
    acc[nombreCurso] = (acc[nombreCurso] || 0) + +pago.monto;
    return acc;
  }, {} as { [curso: string]: number });

  this.chartData = {
    labels: Object.keys(recaudacionPorCurso),
    datasets: [
      {
        data: Object.values(recaudacionPorCurso),
        label: 'Recaudación por curso ($)',
        backgroundColor: '#4CAF50'
      }
    ]
  };

  // Gráfico por mes
  const recaudacionPorMes = this.pagosFiltrados.reduce((acc, pago) => {
    const fecha = new Date(pago.fecha_pago);
    const mes = fecha.toLocaleString('default', { month: 'short' });
    const clave = `${mes} ${fecha.getFullYear()}`;
    acc[clave] = (acc[clave] || 0) + +pago.monto;
    return acc;
  }, {} as { [mes: string]: number });

  const mesesOrdenados = Object.keys(recaudacionPorMes).sort((a, b) => {
    const [mesA, añoA] = a.split(' ');
    const [mesB, añoB] = b.split(' ');
    const fechaA = new Date(`${mesA} 1, ${añoA}`);
    const fechaB = new Date(`${mesB} 1, ${añoB}`);
    return fechaA.getTime() - fechaB.getTime();
  });

    this.chartMensualData = {
      labels: mesesOrdenados,
      datasets: [
        {
          data: mesesOrdenados.map(mes => recaudacionPorMes[mes]),
          label: 'Ingresos por mes ($)',
          backgroundColor: '#2196F3',
          borderColor: '#2196F3',
          fill: false,
          tension: 0.3
        }
      ]
    };

}


  cerrarSesion(): void {
    this.authService.logout();       
    this.router.navigate(['/acceso']);
  }
}
