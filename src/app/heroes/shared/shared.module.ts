import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

//Own Components
import { NavComponent } from './nav/nav.component';
import { AccumulateComponent } from './accumulate/accumulate.component';
import { AverageComponent } from './average/average.component';

@NgModule({
  declarations: [NavComponent, AccumulateComponent, AverageComponent],
  exports: [NavComponent, AccumulateComponent,AverageComponent],
  imports: [CommonModule, RouterModule, NgbModule],
})
export class SharedModule {}
