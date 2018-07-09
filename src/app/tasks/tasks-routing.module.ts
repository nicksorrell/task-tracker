import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskDetailResolverService } from './task-detail-resolver.service';

const appRoutes: Routes = [
    { path: 'tasks', component: TasksComponent, children: [
        { path: 'new', component: TaskEditComponent },
        { path: ':id', component: TaskDetailComponent, resolve: { task: TaskDetailResolverService } },
        { path: ':id/edit', component: TaskEditComponent, resolve: { task: TaskDetailResolverService } },
        { path: '', component: TaskHomeComponent }
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class TasksRoutingModule { }
