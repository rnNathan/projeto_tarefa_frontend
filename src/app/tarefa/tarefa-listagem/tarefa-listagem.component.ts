import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../shared/model/tarefa';
import { TarefaSeletor } from '../../shared/model/seletor/tarefaSeletor';
import { TarefaService } from '../../shared/service/tarefa.service';
import { UsuarioService } from '../../shared/service/usuario.service';
import { ItemTarefaService } from '../../shared/service/itemTarefa.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../shared/model/usuario';
import { TarefaTemplateDTO } from '../../shared/model/DTO/TarefaTemplateDTO';
import { ItemTarefa } from '../../shared/model/itemTarefa';



@Component({
  selector: 'app-tarefa-listagem',
  //standalone: true,
  //imports: [],
  templateUrl: './tarefa-listagem.component.html',
  styleUrl: './tarefa-listagem.component.scss'
})



export class TarefaListagemComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  public tarefas: Tarefa[] = new Array();
  public idTarefa: number;
  public seletor: TarefaSeletor = new TarefaSeletor();
  public totalPaginas: Number = 0;
  public readonly TAMANHO_PAGINA: number = 0;
  public showForm: boolean = false;
  public isTemplate: boolean = false;
  public tarefa: Tarefa = new Tarefa();
  public novoItem: ItemTarefa = new ItemTarefa();

  constructor(
    private tarefaService: TarefaService,
    private itemTarefaService: ItemTarefaService,
    private router: Router,
    private route: ActivatedRoute

  ) { }


  public tiposTarefa: string[] = ['Estudar', 'Rancho', 'Compra semanal', 'Exercício', 'Diários'];

  ngOnInit(): void {

    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 1;
    this.pesquisar();
  }

  public adicionarItem(tarefa: Tarefa): void {
    tarefa.criandoItem = true;
  }

  public itemCheckboxChange(item: ItemTarefa): void {
    this.itemTarefaService.alterar(item).subscribe(
      (resposta) => {
      },
      (erro) => {
        Swal.fire('Erro ao atualizar o item: ' + erro.error.mensagem, 'error');
      }
    );
  }



  public confirmarTarefa(tarefa: Tarefa): void {
    this.tarefaService.alterar(tarefa).subscribe(
      (resposta) => {
        this.pesquisar();
      },
      (erro) => {
        Swal.fire('Erro ao atualizar a tarefa: ' + erro.error.mensagem, 'error');
      }
    );
  }

  public salvarItem(idTarefa: number): void {
    this.novoItem.idTarefa = idTarefa;
    this.itemTarefaService.inserir(this.novoItem).subscribe(
      (resposta) => {
        this.novoItem = resposta;
        this.novoItem.descricao = '';
        this.pesquisar();
      },
      (erro) => {
        Swal.fire('Erro ao salvar um item!', erro, 'error');
      }
    );
  }

  public buscarItem(): void {
    this.itemTarefaService.consultarPorId(this.novoItem.idItem).subscribe(
      (item) => {
        this.novoItem = item;
      },
      (erro) => {
        Swal.fire('Erro ao buscar um item!', erro, 'error');
      }
    );
  }
  private consultarTodasTarefas() {
    this.tarefaService.consultarTodos().subscribe(
      (resultado) => {
        this.tarefas = resultado;
      },
      (erro) => {
        console.error('erro ao consultar todas as tarefas', erro);
      }
    );
  }
  public pesquisar() {
    const usuarioNoStorage = localStorage.getItem('usuarioAutenticado');
    if (usuarioNoStorage) {
      const usuarioAutenticado = JSON.parse(usuarioNoStorage);
      this.seletor.idUsuario = usuarioAutenticado.idUsuario;
    }
    console.log(this.seletor.idUsuario);
    this.tarefaService.consultarPorFiltro(this.seletor).subscribe(
      (resultado) => {
        this.tarefas = resultado;
      },
      (erro) => {
        console.error('erro ao consultar tarefas por filtros', erro);
      }
    );
  }
  public limpar() {
    this.seletor = new TarefaSeletor();
  }

  public atualizar(idTarefaSelecionada: number) {
    this.router.navigate(['/tarefa/detalhe/', idTarefaSelecionada]);
  }

  public excluir(tarefaSelecionada: Tarefa) {
    Swal.fire({
      title: 'Deseja excluir esta Tarefa?',
      text: 'Essa ação não poderá ser desfeita',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.tarefaService.excluir(tarefaSelecionada.idTarefa).subscribe(
          (resultado) => {
            this.pesquisar();
            Swal.fire('Sucesso!', 'Tarefa excluída com sucesso! ', 'success');
          },
          (erro) => {
            Swal.fire(
              'Erro!',
              'Erro ao excluir tarefa: ' + erro.error.mensagem,
              'error'
            );
          }
        );
      }
    });
  }

  public voltar() {
    this.router.navigate(['/home/']);
  }

  toggleExpanded(tarefa: Tarefa): void {
    tarefa.expanded = !tarefa.expanded;
  }
  public excluirItem(itemSelecionado: ItemTarefa) {
    Swal.fire({
      title: 'Deseja excluir este Item?',
      text: 'Essa ação não poderá ser desfeita',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.itemTarefaService.excluir(itemSelecionado.idItem).subscribe(
          (resultado) => {
            this.pesquisar();
          },
          (erro) => {
            Swal.fire(
              'Erro!',
              'Erro ao excluir tarefa: ' + erro.error.mensagem,
              'error'
            );
          }
        );
      }
    });
  }

  public alterarItem(item: ItemTarefa) {
    this.router.navigate(['/item/detalhe/', item]);
  }

  public contarPaginas() {
    this.tarefaService.contarPaginas(this.seletor).subscribe(
      resultado => {
        this.totalPaginas = resultado;
      },
      erro => {
        Swal.fire('Erro ao consultar total de páginas', erro.error.mensagem, 'error');
      }
    );
  }
  atualizarPaginacao() {
    this.contarPaginas();
    this.pesquisar();
  }

  avancarPagina() {
    this.seletor.pagina++;
    this.pesquisar();
  }

  voltarPagina() {
    this.seletor.pagina--;
    this.pesquisar();
  }

  irParaPagina(indicePagina: number) {
    this.seletor.pagina = indicePagina;
    this.pesquisar();
  }
  criarArrayPaginas(): any[] {
    return Array(this.totalPaginas).fill(0).map((x, i) => i + 1);
  }

  public alterarStatus(tarefaRealizada: Tarefa) {
    this.tarefaService.alterar(tarefaRealizada);
  }

}
