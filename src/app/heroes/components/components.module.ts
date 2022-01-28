import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Own Component
import {MembersComponent} from './members/members.component';
import { AddHeroesComponent } from './add-heroes/add-heroes.component';


@NgModule({
  declarations: [MembersComponent, AddHeroesComponent],
  imports: [
    CommonModule
  ],
  exports:[MembersComponent,AddHeroesComponent],
})
export class ComponentsModule { }
