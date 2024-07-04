import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RodapeComponent } from './components/rodape/rodape.component';
import { HomeComponent } from '../home/home/home.component';



@NgModule({
  declarations: [ RodapeComponent, HomeComponent],
  exports: [ RodapeComponent, HomeComponent ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
