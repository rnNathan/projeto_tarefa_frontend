import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginCadastroComponent } from './login-cadastro/login-cadastro.component';


const routes: Routes = [
  { path: '', component: LoginComponent,

    children: [
        { path: 'home',
             loadChildren: () =>
             import('../home/home.module').then((m) => m.HomeModule)
           }
         ]
   }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
