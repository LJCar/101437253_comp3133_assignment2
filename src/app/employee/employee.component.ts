import { Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEES } from '../graphql/queries';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  loading = true;
  searchTerm = '';

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_EMPLOYEES
    }).valueChanges.subscribe((result: any) => {
      this.employees = result?.data?.employees;
      this.filteredEmployees = this.employees;
      this.loading = result.loading;
    });
  }

  filterEmployees(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.department.toLowerCase().includes(term) ||
      emp.job_title.toLowerCase().includes(term)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterEmployees();
  }
}
