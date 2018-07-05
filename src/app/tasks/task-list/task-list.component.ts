import { Component, OnInit } from '@angular/core';
import { TaskStoreService } from '../task-store.service';
import { TaskStatus } from '../task.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks = [];
  pristineTasks = [];

  inProgressCount: number;
  completeCount: number;
  onHoldCount: number;
  deferredCount: number;

  showInProgress = true;
  showComplete = true;
  showOnHold = true;
  showDeferred = true;

  tasksSubscription: Subscription;

  constructor(private taskStoreService: TaskStoreService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.tasks = this.taskStoreService.getTasks();
    this.pristineTasks = this.tasks;

    this.updateState();
    this.filterTasks();

    this.tasksSubscription = this.taskStoreService.taskListUpdated.subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.updateState();
        this.filterTasks();
      }
    );
  }

  setActiveTask(taskIndex) {
    this.taskStoreService.setActiveTask(taskIndex);
    this.router.navigate([taskIndex], {relativeTo: this.route});
  }

  updateState() {
    this.inProgressCount = 0;
    this.completeCount = 0;
    this.onHoldCount = 0;
    this.deferredCount = 0;

    for (const task of this.tasks) {
      switch (task.status) {
        case TaskStatus.IN_PROGRESS:
          this.inProgressCount++;
          break;
        case TaskStatus.COMPLETE:
          this.completeCount++;
          break;
        case TaskStatus.ON_HOLD:
          this.onHoldCount++;
          break;
        case TaskStatus.DEFERRED:
          this.deferredCount++;
          break;
        default:
          break;
      }
    }
  }

  filterTasks() {
    const statusFilters = [];

    if (this.showInProgress) {
      statusFilters.push(TaskStatus.IN_PROGRESS);
    }

    if (this.showComplete) {
      statusFilters.push(TaskStatus.COMPLETE);
    }

    if (this.showOnHold) {
      statusFilters.push(TaskStatus.ON_HOLD);
    }

    if (this.showDeferred) {
      statusFilters.push(TaskStatus.DEFERRED);
    }

    this.tasks = [];

    statusFilters.map(
      statusFilter => this.pristineTasks.filter(
        task => task.status === statusFilter
      ).map(
        result => this.tasks.push(result)
      )
    );
  }
}
