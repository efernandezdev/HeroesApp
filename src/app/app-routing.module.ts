import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import {PagesRoutingModule} from './heroes/pages/pages-routing.module';

const routes: Routes = [
    {path:'',redirectTo:'/heroes/home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule,PagesRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
