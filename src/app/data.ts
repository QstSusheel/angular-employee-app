import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { empVM } from '../Models/employee';

@Injectable({
  providedIn: 'root',
})
export class Data implements InMemoryDbService {
  
  constructor() {}


  
  createDb() {
    let employees: empVM[] = [
      { id: 1,
        department: 'Accounts',
        empName: 'Ram',
        mobile: '1234567890',
        gender: 'Male',
        joinDate: '2025-01-01',
        email: 'ram@gmail.com',
        salary: 81790,
        password: '12345',
        confirmPass: '12345',
        empStatus: true
      },
      { id: 2, 
        department: 'Manager',
        empName: 'Shyam',
        mobile: '1234567999',
        gender: 'Male',
        joinDate: '2023-01-01',
        email: 'shyam@gmail.com',
        salary: 85790,
        password: '12345',
        confirmPass: '12345',
        empStatus: true
      },
      { id: 3, 
        department: 'Administrator',
        empName: 'Om',
        mobile: '1234567777',
        gender: 'Male',
        joinDate: '2020-01-01',
        email: 'om@gmail.com',
        salary: 88790,
        password: '12345',
        confirmPass: '12345',
        empStatus: true
      }
    ];
    return { employees};
  }
}
