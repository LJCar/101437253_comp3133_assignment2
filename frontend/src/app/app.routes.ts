import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeeComponent } from './employee/employee.component';
import {authGuard} from './guards/auth.guard';
import {LogoutComponent} from './logout/logout.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {UpdateEmployeeComponent} from './update-employee/update-employee.component';
import {ViewEmployeeComponent} from './view-employee/view-employee.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeComponent, canActivate: [authGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: 'employees/add', component: AddEmployeeComponent, canActivate: [authGuard] },
  { path: 'employees/update/:id', component: UpdateEmployeeComponent, canActivate: [authGuard] },
  { path: 'employees/view/:id', component: ViewEmployeeComponent, canActivate: [authGuard] }

];
