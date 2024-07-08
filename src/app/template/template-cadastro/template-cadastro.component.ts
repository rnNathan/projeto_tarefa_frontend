import { Component, ViewChild } from '@angular/core';
import { ItemTarefa } from '../../shared/model/itemTarefa';
import { Tarefa } from '../../shared/model/tarefa';
import { Usuario } from '../../shared/model/usuario';
import { NgForm } from '@angular/forms';
import { TarefaService } from '../../shared/service/tarefa.service';
import { UsuarioService } from '../../shared/service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TarefaTemplateDTO } from '../../shared/model/DTO/TarefaTemplateDTO';

@Component({
  selector: 'app-template-cadastro',
  //standalone: true,
  //imports: [],
  templateUrl: './template-cadastro.component.html',
  styleUrl: './template-cadastro.component.scss'
})

export class TemplateCadastroComponent {

  public itens: ItemTarefa[] = new Array();
  public itemTarefa: ItemTarefa = new ItemTarefa();
  public tarefa: Tarefa = new Tarefa();
  public idTarefa: number;
  public usuarios: Array<Usuario> = new Array();
  public novaTarefa: Tarefa = new Tarefa();
  public listaTemplates: Array<Tarefa> = new Array();
  public tarefaDTO: TarefaTemplateDTO = new TarefaTemplateDTO();

  @ViewChild('ngForm')
  public ngForm: NgForm;

  public tiposTarefa: string[] = ['Estudar', 'Rancho', 'Compra semanal', 'Exercício', 'Diários'];

  constructor(
    private tarefaService: TarefaService,
    private router: Router, // COMPONENTE PARA FAZER ROTEAMENTO ENTRA AS TELAS
    private route: ActivatedRoute //PEGAR OS PARAMETROS DA URL
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idTarefa = params['id'];
      if (this.idTarefa) {
        this.buscarTarefa();
      }
    });

    this.listaTemplate();

  }

  public salvar(): void {
    if (this.idTarefa) {
      this.alterar();
    } else {
      this.inserir();
    }
  }

  public inserir(): void {
    const usuarioNoStorage = localStorage.getItem('usuarioAutenticado');
    if (usuarioNoStorage) {
      const usuarioAutenticado = JSON.parse(usuarioNoStorage);
      this.tarefa.idUsuario = usuarioAutenticado.idUsuario; // Atribuindo o id do usuário na tarefa.
      this.tarefaService.inserir(this.tarefa).subscribe(
        (resposta) => {
          this.tarefa = resposta;
          Swal.fire('Tarefa salva com sucesso!', '', 'success');
          this.router.navigate(['/tarefa/lista']);
        },
        (erro) => {
          Swal.fire('Erro ao salvar uma tarefa!', erro, 'error');
        }
      );
    }
  }

  public alterar(): void {
    this.tarefaService.alterar(this.tarefa).subscribe(
      (resposta) => {
        Swal.fire('Tarefa atualizada com sucesso!', '', 'success');
        this.router.navigate(['/tarefa/lista']);
      },
      (erro) => {
        Swal.fire(
          'Erro ao atualizar a tarefa: ' + erro.error.mensagem,
          'error'
        );
      }
    );
  }

  public buscarTarefa(): void {
    this.tarefaService.consultarPorId(this.idTarefa).subscribe(
      (resposta) => {
        this.tarefa = resposta;
      },
      (erro) => {
        Swal.fire('Erro ao buscar uma tarefa!', erro, 'error');
      }
    );
  }

  public voltar() {
    this.router.navigate(['/tarefa/lista']);
  }

  validarNome(){
    let estiloInput = 'form-control';

    if(this.ngForm && this.ngForm.invalid){
      if(this.tarefa.nomeTarefa != null && this.tarefa.nomeTarefa.length < 3){
        estiloInput = 'form-control is-invalid';
      }
    }
    return estiloInput;
  }

  public listaTemplate() {
    this.tarefaService.listaTemplate().subscribe(
      (resposta) => {
        this.listaTemplates = resposta;
      }
    )
  }

  public criarTarefaAPartirDeTemplate() {
      this.tarefaService.criarTarefaAPartirDeTemplate(this.tarefaDTO).subscribe(
      (resposta) => {
        this.tarefa = resposta;
        Swal.fire('Tarefa salva com sucesso!', '', 'success');
          this.router.navigate(['/tarefa/lista']);
      }
    )
  }
}



