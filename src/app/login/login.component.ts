import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { Apollo } from 'apollo-angular';
import { LOGIN_USER } from '../graphql/mutations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any
  errorMessage: string | null = null;

  constructor(private apollo: Apollo, private router: Router, private formBuilder: FormBuilder) {}

    ngOnInit(): void{
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
      this.loginForm.valueChanges.subscribe(() => {
        this.errorMessage = null;
      });
    }

    login(){
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;

        this.apollo.mutate({
          mutation: LOGIN_USER,
          variables: { email: email.trim(), password: password.trim() }
        }).subscribe({
          next: (result: any) => {
            const token = result.data.login.token;
            localStorage.setItem('token', token);
            this.router.navigate(['/employees']);
          },
          error: (err) => {
            const msg = err?.message || 'Something went wrong';
            if (msg.includes('Invalid email or password')) {
              this.errorMessage = 'Invalid email or password.';
            } else {
              this.errorMessage = msg;
            }
          }
        });
      } else {
        this.loginForm.markAllAsTouched();
      }
    }
}
