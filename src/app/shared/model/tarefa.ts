import { Usuario } from "./usuario";
import { ItemTarefa } from "./itemTarefa";

export class Tarefa {

  idTarefa: number;
  usuario: Usuario;
  nomeTarefa: string;
  tipoTarefa: string;
  itensTarefa: ItemTarefa[] = [];
  realizado: boolean;
  isTemplate: boolean = false;
  expanded: boolean;

  //Transiente, usado apenas na tela
  criandoItem: boolean = false;
}
