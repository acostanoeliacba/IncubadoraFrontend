import { Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { AccesoComponent } from './acceso/acceso.component';
import { RegistroComponent } from './registro/registro.component';
import { CarpinteriaComponent } from './carpinteria/carpinteria.component';
import { DisenoComponent } from './diseno/diseno.component';
import { InformaticaComponent } from './informatica/informatica.component';
import { MecanicaComponent } from './mecanica/mecanica.component';
import { OratoriaComponent } from './oratoria/oratoria.component';
import { PinturaComponent } from './pintura/pintura.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { CaligrafiaComponent } from './caligrafia/caligrafia.component';
import {ManicuriaComponent } from './manicuria/manicuria.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'acceso', component: AccesoComponent},
    { path: 'registro', component: RegistroComponent},
    {path: 'carpinteria', component: CarpinteriaComponent},
    {path: 'diseno', component: DisenoComponent},
    {path: 'informatica', component: InformaticaComponent},
    {path: 'mecanica', component: MecanicaComponent},
    {path: 'oratoria', component: OratoriaComponent},
    {path: 'pintura', component: PinturaComponent},
    {path: 'administracion', component: AdministracionComponent},
    {path: 'caligrafia', component: CaligrafiaComponent},
    {path: 'manicuria', component: ManicuriaComponent},

];
