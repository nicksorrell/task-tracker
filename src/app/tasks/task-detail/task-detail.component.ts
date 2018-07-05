import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskStoreService } from '../task-store.service';
import { Task } from '../task.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  task: Task;
  taskSubscription: Subscription;

  constructor(private taskStoreService: TaskStoreService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { task: Task}) => {
        this.task = data.task;
      }
    );

    this.taskSubscription = this.taskStoreService.activeTask.subscribe(
      (task) => {
        this.task = task;
      }
    );
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }

  setComplete() {
    this.taskStoreService.setTaskComplete(this.task.id);
  }

  setInProgress() {
    this.taskStoreService.setTaskActive(this.task.id);
  }

  setSuspended() {
    this.taskStoreService.setTaskSuspended(this.task.id);
  }

  setDeferred() {
    this.taskStoreService.setTaskDeferred(this.task.id);
  }

  editTask() {
    console.log(this.route);
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
