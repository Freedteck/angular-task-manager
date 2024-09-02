import { Injectable } from '@angular/core';
import { Task } from './task';
import { BehaviorSubject } from 'rxjs';

interface AllTasks {
  new: Task[];
  inProgress: Task[];
  done: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: AllTasks;
  private tasksSubject: BehaviorSubject<AllTasks>;

  constructor() {
    const savedTasks = localStorage.getItem('tasks');
    this.tasks = savedTasks
      ? JSON.parse(savedTasks)
      : {
          new: [],
          inProgress: [],
          done: [],
        };
    this.tasksSubject = new BehaviorSubject(this.tasks);
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks() {
    return this.tasksSubject.asObservable();
  }

  addTask(title: string, description: string) {
    const task: Task = { id: this.tasks.new.length, title, description };
    this.tasks.new.push(task);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  editTask(task: Task, status: 'new' | 'inProgress' | 'done') {
    const index = this.tasks[status].findIndex((t) => t.id == task.id);
    this.tasks[status][index].title = task.title;
    this.tasks[status][index].description = task.description;
    this.saveTasks();
  }

  deleteTask(task: Task, status: 'new' | 'inProgress' | 'done') {
    const index = this.tasks[status].findIndex((t) => t.id == task.id);
    this.tasks[status].splice(index, 1);
    this.saveTasks();
  }
}
