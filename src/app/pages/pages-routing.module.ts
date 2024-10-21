import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { ToasterComponent } from './toaster/toaster.component';
import { authGuard } from '../guards/auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  // {path:'dashboard', component:PagesComponent, canActivate:[authGuard],
  {
    path: 'dashboard',
    component: PagesComponent,

    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Listado de módulos' },
      },
      {
        path: 'usuario',
        children: [
          {
            path: '',
            component: UserComponent,
            data: { titulo: 'Listado de Usuarios' },
          }
        ]
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            component: HeroesComponent,
            data: { titulo: 'Listado de perfiles' },
          }
        ]
      },
      // {
      //   path: 'heroes',
      //   component: HeroesComponent,
      //   data: { titulo: 'DataTable' },
      // },
      // {
      //   path: 'toaster',
      //   component: ToasterComponent,
      //   data: { titulo: 'Toaster' },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
