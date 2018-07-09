import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Task, TaskStatus } from '../task.model';
import { TaskStoreService } from '../task-store.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  taskEditForm: FormGroup;
  task: Task;
  editMode: boolean;

  constructor(private taskStoreService: TaskStoreService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: {task: Task}) => {
        if (data.task != null) {
          this.task = data.task;
          this.editMode = true;
        } else {
          this.task = new Task(
            this.taskStoreService.getUniqueID(),
            1,
            '',
            {
              background: '',
              requirements: ['']
            },
            TaskStatus.IN_PROGRESS,
            '',
            '',
            ['']
          );
          this.editMode = false;
        }
        this.initform();
      }
    );
  }

  initform() {
    const taskPOCs = new FormArray([]);
    const taskRequirements = new FormArray([]);

    for (const poc of this.task.POC) {
      taskPOCs.push(
        new FormControl(poc, Validators.required)
      );
    }

    for (const requirement of this.task.description.requirements) {
      taskRequirements.push(
        new FormControl(requirement, Validators.required)
      );
    }

    this.taskEditForm = new FormGroup({
      'name': new FormControl(this.task.name, Validators.required),
      'status': new FormControl(this.task.status, Validators.required),
      'POC': taskPOCs,
      'dateOpened': new FormControl(
        this.task.dateOpened,
        [Validators.required, Validators.pattern(/(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})/)]),
      'dateClosed': new FormControl(
        this.task.dateClosed,
        Validators.pattern(/(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})/)),
      'background': new FormControl(this.task.description.background, Validators.required),
      'requirements': taskRequirements
    });
  }

  onAddPOC() {
    if ((<FormArray>this.taskEditForm.get('POC')).length < 3) {
      (<FormArray>this.taskEditForm.get('POC')).push(
        new FormControl(null)
      );
    }
  }

  onRemovePOC(index) {
    (<FormArray>this.taskEditForm.get('POC')).removeAt(index);
  }

  onAddRequirement() {
    (<FormArray>this.taskEditForm.get('requirements')).push(
      new FormControl(null)
    );
  }

  onRemoveRequirement(index) {
    (<FormArray>this.taskEditForm.get('requirements')).removeAt(index);
  }

  getPOCControls() {
    return (<FormArray>this.taskEditForm.get('POC')).controls;
  }

  getRequirementControls() {
    return (<FormArray>this.taskEditForm.get('requirements')).controls;
  }

  onCancelEdit() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onSaveTask() {
    const taskData = new Task(
      this.task.id,
      1,
      this.taskEditForm.value.name,
      {
        background: this.taskEditForm.value.background,
        requirements: this.taskEditForm.value.requirements
      },
      this.taskEditForm.value.status,
      this.taskEditForm.value.dateOpened,
      this.taskEditForm.value.dateClosed,
      this.taskEditForm.value.POC
    );

    if (this.editMode) {
      this.taskStoreService.updateTask(this.task.id, taskData);
    } else {
      this.taskStoreService.addTask(taskData);
    }

    this.router.navigate(['..'], {relativeTo: this.route});
  }

}
