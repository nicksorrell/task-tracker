import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TaskStoreService } from './task-store.service';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailResolverService implements Resolve<Task> {

  constructor(private taskStoreService: TaskStoreService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Task {
    const id = +route.paramMap.get('id');

    if (this.taskStoreService.taskExists(id)) {
      this.taskStoreService.setActiveTask(id);
      return this.taskStoreService.getActiveTask();
    } else {
      this.router.navigate(['/tasks']);
      return null;
    }
  }
}
