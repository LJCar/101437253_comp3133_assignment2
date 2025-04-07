import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE } from '../graphql/mutations';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {
  updateForm!: FormGroup;
  employeeId!: string;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;

    this.updateForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      job_title: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required],
      employee_photo: ['']
    });

    this.updateForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });

    this.apollo.query({
      query: GET_EMPLOYEE_BY_ID,
      variables: { id: this.employeeId },
      fetchPolicy: 'network-only'
    }).subscribe((res: any) => {
      const emp = res.data?.employee;
      if (emp) {
        this.updateForm.patchValue({
          first_name: emp.first_name || '',
          last_name: emp.last_name || '',
          email: emp.email || '',
          gender: emp.gender || '',
          job_title: emp.job_title || '',
          salary: emp.salary || null,
          date_of_joining: emp.date_of_joining || '',
          department: emp.department || '',
          employee_photo: emp.employee_photo || ''
        });
      }
    });
  }

  updateEmployee(): void {
    if (this.updateForm.valid) {
      this.apollo.mutate({
        mutation: UPDATE_EMPLOYEE,
        variables: {
          id: this.employeeId,
          ...this.updateForm.value
        }
      }).subscribe({
        next: () => {
          this.successMessage = 'Employee information updated.';
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/employees']);
          }, 2000);
        },
        error: (err) => {
          const msg = err?.message || 'Something went wrong';
          if (msg.includes('Email already exists')) {
            this.errorMessage = 'An Employee with this email already exists.';
          } else {
            this.errorMessage = msg;
          }
        }
      });
    } else {
      this.updateForm.markAllAsTouched();
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.updateForm.patchValue({
          employee_photo: reader.result?.toString().split(',')[1]
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
