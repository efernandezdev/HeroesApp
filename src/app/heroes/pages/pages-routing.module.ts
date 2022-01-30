import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { SearchHeroesComponent } from './search-heroes/search-heroes.component';

import { AuthGuardsGuard } from '../guards/auth-guards.guard';

const routes: Routes = [
  {
    path: 'heroes',
    component: PagesComponent,
    canActivate: [AuthGuardsGuard],
    canActivateChild: [AuthGuardsGuard],

    children: [
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchHeroesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
