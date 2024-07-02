import { Component } from '@angular/core';
import { UsuarioDTO } from '../../shared/model/DTO/usuario.DTO';
import { LoginService } from '../../shared/service/login.service';
import { Router } from '@angular/router';
import { Usuario } from '../../shared/model/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  //standalone: true,
  //imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public dto: UsuarioDTO = new UsuarioDTO();

  constructor(private loginService: LoginService, 
              private router: Router){
  }

  public realizarLogin(){
     this.loginService.autenticar(this.dto).subscribe(
      (usuarioAutenticado: Usuario) => {
        Swal.fire('Sucesso', 'Usuário autenticado com sucesso!', 'success');
        localStorage.setItem('usuarioAutenticado', JSON.stringify(usuarioAutenticado));
        this.router.navigate(['/home']);
      },
      (erro) =>
        Swal.fire('Erro', erro.error.mensagem, 'error')
     )
  }

  public cadastro(){
    this.router.navigate(['/login/cadastro'])
  }

}
