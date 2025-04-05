import { Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEES } from '../graphql/queries';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DeleteEmployeeComponent} from '../delete-employee/delete-employee.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    FormsModule,
    DeleteEmployeeComponent,
    TitleCasePipe
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchTerm = '';
  selectedForDelete: string | null = null;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.apollo.watchQuery({
      query: GET_EMPLOYEES,
      fetchPolicy: 'network-only'
    }).valueChanges.subscribe((result: any) => {
      this.employees = result?.data?.employees;
      this.filteredEmployees = this.employees;
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

  onDeleted(id: string): void {
    this.selectedForDelete = null;
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.filterEmployees();
  }
}
