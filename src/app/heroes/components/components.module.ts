import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Own Component
import {MembersComponent} from './members/members.component';
import { AddHeroesComponent } from './add-heroes/add-heroes.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [MembersComponent, AddHeroesComponent],
  imports: [
    CommonModule,ReactiveFormsModule, FormsModule
  ],
  exports:[MembersComponent,AddHeroesComponent],
})
export class ComponentsModule { }
