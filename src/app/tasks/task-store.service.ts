import { Injectable } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskStoreService {
  currentTask: Task;
  currentTaskIndex: number;
  activeTask = new Subject<Task>();
  taskListUpdated = new Subject<Task[]>();

  tasks = [
    new Task(1, 3, 'Code Repository', {
        background: `The Government requires the DL DART Team to build and maintain
        a code repository in accordance with provided requirements.`,
        requirements: [
          'None'
        ]},
        TaskStatus.DEFERRED, '2016-09-23', '2018-05-03', ['Vaughter']),

    new Task(2, 2, 'Army Resource Validator', {
      background: `The Army Resource Validator and SCORM validation tools are outdated and require
      modifications to function on current computer configurations.`,
      requirements: [
        'Update Army SCORM validation tools to function on current computer configurations.',
        'Provide LOE to recreate tools as web applications.'
      ]},
      TaskStatus.IN_PROGRESS, '2018-01-09', '', ['Thomann', 'Sorrell']),

    new Task(3, 2, 'SMS Module Redevelopment', {
      background: `The ALDPA requires all criticality errors found during PL DLS testing of SMS content be fixed prior
      to fielding.`,
      requirements: [
        'Redevelop SMS modules as necessary using Adobe Captivate once the Government has made the software available.'
      ]},
      TaskStatus.ON_HOLD, '2018-04-20', '', ['Dinkle'])
  ];

  constructor() { }

  getTasks() {
    return this.tasks;
  }

  getActiveTask() {
    return this.currentTask;
  }

  setActiveTask(index) {
    this.currentTask = this.tasks.filter(
      task => task.id === index
    )[0];
    this.currentTaskIndex = this.tasks.indexOf(this.currentTask);
    this.activeTask.next(this.currentTask);
  }

  setTaskComplete(id) {
    this.tasks[this.currentTaskIndex].status = TaskStatus.COMPLETE;
    this.tasks[this.currentTaskIndex].dateClosed = this.getCurrentDate();
    this.taskListUpdated.next(this.tasks);
  }

  setTaskActive(id) {
    this.tasks[this.currentTaskIndex].status = TaskStatus.IN_PROGRESS;
    this.tasks[this.currentTaskIndex].dateOpened = this.getCurrentDate();
    this.taskListUpdated.next(this.tasks);
  }

  setTaskSuspended(id) {
    this.tasks[this.currentTaskIndex].status = TaskStatus.ON_HOLD;
    this.taskListUpdated.next(this.tasks);
  }

  setTaskDeferred(id) {
    this.tasks[this.currentTaskIndex].status = TaskStatus.DEFERRED;
    this.taskListUpdated.next(this.tasks);
  }

  addTask(data) {
    this.tasks.push(data);
    this.taskListUpdated.next(this.tasks);
  }

  updateTask(id, data) {
    const theTask = this.tasks.filter(
      task => task.id === id
    )[0];
    this.tasks[this.tasks.indexOf(theTask)] = data;
    this.taskListUpdated.next(this.tasks);
  }

  removeTask(id) {
    const theTask = this.tasks.filter(
      task => task.id === id
    )[0];
    this.tasks.splice(this.tasks.indexOf(theTask), 1);
    this.taskListUpdated.next(this.tasks);
  }

  getCurrentDate() {
    return new Date().toISOString().split('T')[0];
  }

  taskExists(id) {
    if (this.tasks.findIndex( (task) => task.id === id ) === -1) {
      return false;
    } else {
      return true;
    }
  }

  getUniqueID() {
    const taskIDs = [];
    for (const task of this.tasks) {
      taskIDs.push(task.id);
    }
    taskIDs.sort();
    return (taskIDs[taskIDs.length - 1] + 1);
  }
}
