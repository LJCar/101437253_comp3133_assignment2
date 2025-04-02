import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm: any;

  constructor(private formBuilder: FormBuilder) {}

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
  }

  signup(){
    if(this.signupForm.valid){
      return;
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
