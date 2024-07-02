import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UsuarioDadosComponent } from "./usuario-dados/usuario-dados.component";

const routes: Routes = [
    { path: 'dados', component: UsuarioDadosComponent}
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UsuarioRoutingModule { }
