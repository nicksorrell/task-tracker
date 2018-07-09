import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TasksComponent } from './tasks.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-list/task-item/task-item.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskEditComponent } from './task-edit/task-edit.component';

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    TasksComponent
  ],
  declarations: [
    TasksComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskDetailComponent,
    TaskHomeComponent,
    TaskEditComponent
  ]
})
export class TasksModule { }
