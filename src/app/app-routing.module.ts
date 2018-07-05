import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';
import { PeopleComponent } from './people/people.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full'},
    { path: 'tasks', component: TasksComponent },
    { path: 'people', component: PeopleComponent},
    { path: '**', redirectTo: 'tasks' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
