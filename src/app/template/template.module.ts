import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRoutingModule } from './template-routing.module';
import { TarefaRoutingModule } from '../tarefa/tarefa-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TemplateCadastroComponent } from './template-cadastro/template-cadastro.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TemplateCadastroComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    TarefaRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class TemplateModule { }
