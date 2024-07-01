import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RodapeComponent } from './shared/components/rodape/rodape.component';
import { HomeModule } from './home/home.module';
import { AppRouting } from './app.routes';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule, // módulo de requisições HTTP
    FormsModule, // módulo de formulários
    HomeModule
  ],
  //Adicionando o interceptor ao módulo
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],  
  bootstrap: [AppComponent]
})
export class AppModule { }