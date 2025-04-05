import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DELETE_EMPLOYEE } from '../graphql/mutations';

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.css'
})
export class DeleteEmployeeComponent {
  @Input() employeeId!: string;
  @Output() deleted = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  constructor(private apollo: Apollo) {}

  confirmDelete() {
    this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { id: this.employeeId }
    }).subscribe({
      next: () => this.deleted.emit(),
      error: (err) => console.error('Delete error:', err)
    });
  }

  cancel() {
    this.cancelled.emit();
  }
}
