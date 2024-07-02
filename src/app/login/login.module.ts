import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from '../auth/request.interceptor';
import { LoginCadastroComponent } from './login-cadastro/login-cadastro.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginCadastroComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpClientModule,
    FormsModule
  ],

 
})
export class LoginModule { }