import { Component, Input, OnInit, input } from '@angular/core';
import { Tarefa } from '../../shared/model/tarefa';
import { ItemTarefa } from '../../shared/model/itemTarefa';
import { TarefaSeletor } from '../../shared/model/seletor/tarefaSeletor';
import { TarefaService } from '../../shared/service/tarefa.service';
import { ItemTarefaService } from '../../shared/service/itemTarefa.service';

import { Usuario } from '../../shared/model/usuario';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-test',
  //standalone: true,
  //imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  public tarefas: Tarefa[] = new Array();
  public idTarefa: number;
  public seletor: TarefaSeletor = new TarefaSeletor();
  public totalPaginas: Number = 0;
  public readonly TAMANHO_PAGINA: number = 0;
  public showForm: boolean = false;
  public isTemplate: boolean = false;
  public tarefa: Tarefa = new Tarefa();
  public item: ItemTarefa = new ItemTarefa();

  constructor(
    private tarefaService: TarefaService,
    private itemTarefaService: ItemTarefaService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.pesquisar();
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 1;

    this.route.params.subscribe(params => {
      this.idTarefa = params['id'];
      console.log('ID da Tarefa:', this.idTarefa);

      // Chame o método para buscar os itens da tarefa, se necessário
      if (this.idTarefa) {
        this.buscarItem();
      }
    });

  }

  public inserir(idTarefaSelecionada: number): void {

    this.router.navigate(['/tarefa/:id', idTarefaSelecionada]);
    this.itemTarefaService.inserir(this.item).subscribe(
      (resposta) => {
        this.item = resposta;
        Swal.fire('Item salvo com sucesso!', '', 'success');
        this.voltar();
      },
      (erro) => {
        Swal.fire('Erro ao salvar um item!', erro, 'error');
      }
    );
  }

  public buscarItem(): void {
    this.itemTarefaService.consultarPorId(this.item.idItem).subscribe(
      (item) => {
        this.item = item;
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
    this.router.navigate(['/tarefa/']);
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
            Swal.fire('Sucesso!', 'Item excluída com sucesso! ', 'success');
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



}
