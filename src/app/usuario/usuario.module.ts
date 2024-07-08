import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioDadosComponent } from './usuario-dados/usuario-dados.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UsuarioDadosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsuarioRoutingModule,
    SharedModule
  ]
})
export class UsuarioModule { }
