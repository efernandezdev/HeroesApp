import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Own Components
import { SearchHeroesComponent } from './search-heroes/search-heroes.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';

//Own Modules
import {SharedModule} from '../shared/shared.module';
import {ComponentsModule} from '../components/components.module';

@NgModule({
  declarations: [HomeComponent, SearchHeroesComponent, PagesComponent],
  exports: [HomeComponent, SearchHeroesComponent,PagesComponent],
  imports: [CommonModule, SharedModule, RouterModule,ComponentsModule],
})
export class PagesModule {}
