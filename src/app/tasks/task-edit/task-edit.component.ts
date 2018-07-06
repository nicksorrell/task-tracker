import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskStoreService } from '../task-store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  task: Task;

  constructor(private taskStoreService: TaskStoreService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: {task: Task}) => {
        this.task = data.task;
      }
    );
  }

  cancelEdit() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

}
