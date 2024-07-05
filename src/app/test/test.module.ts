import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommonModule,
    TestRoutingModule,
    SharedModule
  ]
})
export class TestModule { }
