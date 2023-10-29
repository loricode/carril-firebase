import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { CoreModule } from '../core/core.module';
import { CarrilPipe } from './pipes/carril.pipe';
@NgModule({
  declarations: [
    StudentsComponent,
    CarrilPipe,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    CoreModule
  ]
})
export class StudentsModule { }
