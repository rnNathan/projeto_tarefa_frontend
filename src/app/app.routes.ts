
import {  Routes } from '@angular/router';

export const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
   },
   {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
   },
   {
      path: 'tarefa',
      loadChildren: () => import('./tarefa/tarefa.module').then(m => m.TarefaModule)
   },
   {
      path: 'item',
      loadChildren: () => import('./item/item.module').then(m => m.ItemModule)
   },
   {
      path: 'usuario',
      loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
   },
   {
    path: 'template',
    loadChildren: () => import('./template/template.module').then(m => m.TemplateModule)
 },
];

