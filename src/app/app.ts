import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from './services/employee';
import { empVM } from '../Models/employee';
import { ToastService } from './services/toast.service';
import Swal from 'sweetalert2'
import { DBOperation } from '../Helpers/config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('HR-Management');

  employees = signal<empVM[]>([]);
  employeeForm : FormGroup = new FormGroup({});

  buttonText : string = "Save";
  operation : DBOperation;

  constructor(private _fb: FormBuilder, private _empService: Employee, private _toast: ToastService) {}

  ngOnInit(){
      this.setEmpForm();
      this.allEmployees();
  }

  setEmpForm()
  {
    this.buttonText = "Save";
    this.operation = DBOperation.create;
    this.employeeForm = this._fb.group({
       id: [0],
       department: ['', Validators.required],
       empName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
       mobile: ['', Validators.required],
       gender: ['', Validators.required],
       joinDate: ['', Validators.required],
       email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.(com|in|net|org)$/)]],
       salary: ['', Validators.required],
       password: ['', Validators.required],
       confirmPass: ['', Validators.required],
       empStatus: [false, Validators.requiredTrue]
    });
  }

  formSubmit() {
    if (this.employeeForm.invalid) return;
    const formValue = { ...this.employeeForm.value };
    switch(this.operation){
      case DBOperation.create:
        delete formValue.id;
        this._empService.addEmployee(formValue).subscribe(res => {
            this._toast.success("Employee Added Successfully!");
            this.allEmployees();
            this.onReset();
        });
      break;

      case DBOperation.update:
        this._empService.updateEmployee(formValue).subscribe(res => {
            this._toast.success("Employee Updated Successfully!");
            this.allEmployees();
            this.onReset();
        });
      break;
    }
  }

  get f() {
    return this.employeeForm.controls;
  }

  onReset() {
    this.employeeForm.reset({
      id : 0,
      empStatus : false
    });
    this.buttonText = "Save";
    this.operation = DBOperation.create;
  }

  allEmployees()
  {
    this._empService.getAllEmployees().subscribe((response: empVM[]) => {
        this.employees.set(response);
    })
  }

  Edit(empid : number)
  {
    this.buttonText = "Update";
    this.operation = DBOperation.update;
    let empData = this.employees().find((e : empVM) => e.id === empid );
    this.employeeForm.patchValue(empData);
  }

  Delete(empid : number)
  {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._empService.deleteEmployee(empid).subscribe(res => {
          this.allEmployees();
          this._toast.success("Employee Deleted Successfully!")
        });
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe!",
          icon: "error"
        });
      }
    });
  }
}