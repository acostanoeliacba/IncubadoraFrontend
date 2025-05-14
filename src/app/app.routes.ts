import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AccesoComponent } from './acceso/acceso.component';
import { RegistroComponent } from './registro/registro.component';
import { CursosComponent } from './cursos/cursos.component';
import { DashboardProfeComponent } from './dashboard-profe/dashboard-profe.component';
import { FormularioInscripcionComponent } from './formulario-inscripcion/formulario-inscripcion.component';
import { InscripcionesPorCursoComponent } from './inscripciones-por-curso/inscripciones-por-curso.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ListaInscripcionesComponent } from './lista-alumnos/lista-alumnos.component';
import { PagoComponent } from './pago/pago.component';
import { GraciasComponent } from './gracias/gracias.component';
import { ContenidoInformaticaComponent } from './contenido-informatica/contenido-informatica.component';
import { ContenidoDisenoComponent } from './contenido-diseno/contenido-diseno.component';


import { PagoComponent } from './pago/pago.component';
import { GraciasComponent } from './gracias/gracias.component';
import { ContenidoInformaticaComponent } from './contenido-informatica/contenido-informatica.component';
import { ContenidoDisenoComponent } from './contenido-diseno/contenido-diseno.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'acceso', component: AccesoComponent},
    { path: 'registro', component: RegistroComponent},
    { path: 'cursos', component: CursosComponent},
    { path: 'dashboard-profe', component: DashboardProfeComponent},
    { path: 'formulario-inscripcion', component: FormularioInscripcionComponent},
    { path: 'inscripciones-por-curso', component: InscripcionesPorCursoComponent},
    { path: 'perfil', component: PerfilComponent},
    { path: 'lista-alumnos', component: ListaInscripcionesComponent},
    { path: 'pago', component: PagoComponent},
    { path: 'gracias', component: GraciasComponent},
    { path: 'contenido-informatica', component: ContenidoInformaticaComponent},
    { path: 'contenido-diseno', component: ContenidoDisenoComponent},
];
