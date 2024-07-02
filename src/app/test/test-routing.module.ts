import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestComponent } from "./test/test.component";
import { TarefaDetalheComponent } from "../tarefa/tarefa-detalhe/tarefa-detalhe.component";


const routes: Routes = [
    { path: 'test', component: TestComponent},
    { path: 'tarefa/:id', component: TarefaDetalheComponent}

  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TestRoutingModule { }
