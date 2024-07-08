import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateCadastroComponent } from './template-cadastro/template-cadastro.component';

const routes: Routes = [
  { path: '', component: TemplateCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
