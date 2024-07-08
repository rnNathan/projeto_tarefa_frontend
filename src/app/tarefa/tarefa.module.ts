import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaListagemComponent } from './tarefa-listagem/tarefa-listagem.component';
import { FormsModule } from '@angular/forms';
import { TarefaRoutingModule } from './tarefa-routing.module';
import { TarefaDetalheComponent } from './tarefa-detalhe/tarefa-detalhe.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TarefaListagemComponent,
    TarefaDetalheComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TarefaRoutingModule,
    SharedModule
  ]
})

export class TarefaModule { }
