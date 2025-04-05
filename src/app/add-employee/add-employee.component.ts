import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ADD_EMPLOYEE } from '../graphql/mutations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
  addForm: any;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
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

    this.addForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  addEmployee(): void {
    if (this.addForm.valid) {
      this.apollo.mutate({
        mutation: ADD_EMPLOYEE,
        variables: this.addForm.value
      }).subscribe({
        next: () => {
          this.successMessage = 'Employee information saved.';
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
          this.addForm.reset();
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
      this.addForm.markAllAsTouched();
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.addForm.patchValue({
          employee_photo: reader.result?.toString().split(',')[1]
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
