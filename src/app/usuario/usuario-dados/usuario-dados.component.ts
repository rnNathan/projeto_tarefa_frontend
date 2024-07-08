import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { UsuarioService } from '../../shared/service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-dados',
  templateUrl: './usuario-dados.component.html',
  styleUrls: ['./usuario-dados.component.scss']
})
export class UsuarioDadosComponent implements OnInit {
  usuario: Usuario = new Usuario(); // Inicializa o objeto usuário
  idUsuario: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.buscarUsuario();
  }

  buscarUsuario(): void {
    const usuarioNoStorage = localStorage.getItem('usuarioAutenticado');
    if (usuarioNoStorage) {
      const usuarioAutenticado = JSON.parse(usuarioNoStorage);
      this.idUsuario = usuarioAutenticado.idUsuario; // Atribuindo o id do usuário na tarefa.
      this.usuarioService.consultarPorId(this.idUsuario).subscribe(
        (resposta) => {
          this.usuario = resposta;
        },
        (erro) => {
          Swal.fire('Erro ao buscar os dados do usuário!', erro.message, 'error');
        }
      );
    }
  }

  alterar(): void {
    console.log('erro no alterar.')
    this.usuarioService.alterar(this.usuario).subscribe(
      resposta => {
        Swal.fire('Usuário atualizado com sucesso!', '', 'success');
        this.router.navigate(['/tarefa/lista']);
      },
      erro => {
        Swal.fire(
          'Erro ao atualizar a tarefa: ' + erro.error.mensagem,
          'error'
        );
      }
    );
  }

  voltar(): void {
    this.router.navigate(['/tarefa/']);
  }
}
