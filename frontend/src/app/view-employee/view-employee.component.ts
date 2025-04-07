import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEE_BY_ID } from '../graphql/mutations';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent implements OnInit {
  employee: any;
  employeeId!: string;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.apollo.query({
      query: GET_EMPLOYEE_BY_ID,
      variables: { id: this.employeeId },
      fetchPolicy: 'network-only'
    }).subscribe((res: any) => {
      this.employee = res.data?.employee;
    });
  }
}
