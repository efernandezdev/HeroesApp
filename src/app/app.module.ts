import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Own Module
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './heroes/pages/pages.module';
import {AuthModule} from './auth/auth.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PagesModule, AuthModule, NgbModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
