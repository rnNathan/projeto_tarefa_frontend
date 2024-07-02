import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
     children: [
      {
        path: 'tarefa',
        loadChildren:() => import('../tarefa/tarefa.module').then(m => m.TarefaModule)
      },
      {
        path: 'usuario',
        loadChildren:() => import('../usuario/usuario.module').then(m => m.UsuarioModule)
      },
      {
        path: 'item',
        loadChildren:() => import('../item/item.module').then(m => m.ItemModule)
      },
      {
        path: 'test',
        loadChildren:() => import('../test/test.module').then(m => m.TestModule)
      }
     ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
