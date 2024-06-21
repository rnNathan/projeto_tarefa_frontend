import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';



@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
