import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioDetalheComponent } from './usuario-detalhe/usuario-detalhe.component';
import { FormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioDadosComponent } from './usuario-dados/usuario-dados.component';

@NgModule({
  declarations: [
    UsuarioDetalheComponent,
    UsuarioDadosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
