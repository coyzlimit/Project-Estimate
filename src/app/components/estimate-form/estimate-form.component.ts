import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AppService, Employee, EmployeeEstimate, Task, Project } from 'src/app/app.service';

@Component({
  selector: 'app-estimate-form',
  templateUrl: './estimate-form.component.html',
  styleUrls: ['./estimate-form.component.scss']
})
export class EstimateFormComponent implements OnInit {
  projects: Project[] = [];
  employees: Employee[]= [];
  tasks: Task[]= [];
  empEstimates: EmployeeEstimate[]= [];
  form = new FormGroup({});
  formempEstimates = new FormArray([]);
  isAdd = false;

  constructor(
    private appService: AppService,
    public snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute,
  ) {
    this.isAdd = this.activeRoute.snapshot.routeConfig?.path === 'add';
  }

  ngOnInit(): void {
    this.projects = this.appService.projects;
    this.employees = this.appService.employees;

    this.initForm();

    if(!this.isAdd) {
      this.tasks = this.appService.tasks;
      this.empEstimates = this.appService.empEstimates;
    }
  }

  initForm() {
    this.form = new FormGroup({ 
      project: new FormControl('', Validators.required),
      task: new FormControl('', Validators.required),
      totalEstimate: new FormControl('', Validators.required),
      empEstimates: this.formempEstimates
    });

    this.addEmpEstimates();

    if(!this.isAdd) {
      this.form.disable();
      this.form.controls['task'].enable();
    }
  }

  addEmpEstimates() {
    let newEE = new FormGroup({
      employee: new FormControl('', Validators.required),
      estimate: new FormControl('', Validators.required),
    });

    this.formempEstimates.push(newEE);
  }

  saveTask() {
    let task = this.form.value;

    if(task.empEstimates.length) {
      let empTotal = 0;
      task.empEstimates.forEach((emp: any) => {
        empTotal += emp.estimate;
      });
      
      if(empTotal == task.totalEstimate) {
        this.appService.saveTask(task),
        this.snackBar.open('Saved', '', {duration: 3000}),
        this.form.reset(),
        this.formempEstimates.clear(),
        this.addEmpEstimates();
      }
      else {
        this.snackBar.open('Total Estimate not equal to employees total hours', '', {duration: 3000})
      }
    }
  }

  taskSelected(taskId: number) {
    const task = this.tasks[taskId],
    taskEmpEstimates = this.empEstimates.filter(e =>  e.taskId == taskId);

    this.form.controls['project'].setValue(task.projectId);
    this.form.controls['task'].setValue(task.taskId);
    this.form.controls['totalEstimate'].setValue(task.estimate);

    this.formempEstimates.clear();
    
    taskEmpEstimates.forEach((e, i )=> {
      this.addEmpEstimates();
      (this.formempEstimates.controls[i] as FormGroup).controls['employee'].setValue(e.employeeId);
      (this.formempEstimates.controls[i] as FormGroup).controls['estimate'].setValue(e.time);
    });
    this.form.disable();
    this.form.controls['task'].enable();
  }

  getFormGroup(fg: any) {
    return (fg as FormGroup);
  }

}
