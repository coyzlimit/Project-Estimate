import { Time } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnInit {
  projects: Project[] = [
    {id: 1, name: 'Website'},
    {id: 2, name: 'Mobile App'},
    {id: 3, name: 'Server'},
  ];
  employees: Employee[]= [
    {id: 1, firstName: 'Kyrl', lastName: 'Limitares'},
    {id: 2, firstName: 'Kris', lastName: 'Limitares'},
    {id: 3, firstName: 'Gal', lastName: 'Ponce'},
  ];
  empEstimates: EmployeeEstimate[]= [];
  tasks: Task[]= [];

  constructor() {
    if(localStorage.getItem('empEstimates')) this.empEstimates = JSON.parse(localStorage.getItem('empEstimates') as string);
    if(localStorage.getItem('tasks')) this.tasks = JSON.parse(localStorage.getItem('tasks') as string);
  }

  ngOnInit() {
    console.log(this.tasks);
    
  }

  saveTask(task: any) {
    const taskId = this.tasks.length;
    this.tasks.push({taskId: taskId, task: task.task, estimate: task.totalEstimate, projectId: task.project }),
    
    task.empEstimates.forEach((emp: any) => {
      this.empEstimates.push({taskId: taskId, employeeId: emp.employee, time: emp.estimate})
    });

    localStorage.setItem('empEstimates', JSON.stringify(this.empEstimates)),
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks() {

  }
}

export interface Project {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
}

export interface EmployeeEstimate {
  taskId: number;
  employeeId: number;
  time: number;
}

export interface Task {
  taskId: number;
  task: string;
  estimate: number;
  projectId: number;
}