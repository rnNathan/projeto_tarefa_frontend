import { Usuario } from "./usuario";
import { ItemTarefa } from "./itemTarefa";

export class Tarefa {
  idTarefa: number;
  idUsuario: number;
  nomeTarefa: string;
  tipoTarefa: string;
  itensTarefa: ItemTarefa[] = [];
  realizado: boolean;
  isTemplate: boolean = false; 
  expanded: boolean;

  //transiente, usado apenas na tela.
  criandoItem: boolean = false
  
}