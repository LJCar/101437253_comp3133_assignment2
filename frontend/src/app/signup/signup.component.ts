import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { Apollo } from 'apollo-angular';
import { SIGNUP_USER } from '../graphql/mutations';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm: any;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private apollo: Apollo, private router: Router) {}

  ngOnInit(): void{
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['',[
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^\S+$/)
      ]]
    })
    this.signupForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  signup(){
    if (this.signupForm.valid) {
      const { email, firstName, lastName, password } = this.signupForm.value;

      this.apollo.mutate({
        mutation: SIGNUP_USER,
        variables: {
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          password: password.trim()
        }
      }).subscribe({
        next: (result: any) => {
          const token = result.data.signup.token;
          localStorage.setItem('token', token);
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          const msg = err?.message || 'Something went wrong';
          if (msg.includes('Email already exists')) {
            this.errorMessage = 'An account with this email already exists.';
          } else {
            this.errorMessage = msg;
          }
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
