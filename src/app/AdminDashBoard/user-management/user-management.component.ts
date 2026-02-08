import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  
  // Role options for dropdown
  roleOptions = ['Admin', 'Manager', 'User'];
  
  // Create Admin Modal
  showCreateAdminModal: boolean = false;
  newAdmin = {
    nicNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    address: '',
    userName: '',
    password: ''
  };

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.searchUsers();
  }

  /**
   * Search users using AdminController's search endpoint
   */
  searchUsers(): void {
    this.loading = true;
    this.adminService.searchUsers(this.searchTerm).subscribe({
      next: (data) => {
        console.log('Search results:', data);
        this.users = data;
        this.filteredUsers = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching users:', error);
        this.toastr.error('Failed to load users', 'Error');
        this.loading = false;
      }
    });
  }

  /**
   * Filter users as user types
   */
  onSearchChange(): void {
    this.searchUsers();
  }

  /**
   * Change user role
   */
  changeRole(user: any, newRole: string): void {
    if (confirm(`Change ${user.firstName} ${user.lastName}'s role to ${newRole}?`)) {
      this.adminService.changeUserRole(user.nicNumber, newRole).subscribe({
        next: (response) => {
          console.log('Role changed:', response);
          this.toastr.success(`Role changed to ${newRole}`, 'Success');
          user.roles = newRole; // Update local data
        },
        error: (error) => {
          console.error('Error changing role:', error);
          this.toastr.error('Failed to change role', 'Error');
        }
      });
    }
  }

  /**
   * Open create admin modal
   */
  openCreateAdminModal(): void {
    this.showCreateAdminModal = true;
    this.resetAdminForm();
  }

  /**
   * Close create admin modal
   */
  closeCreateAdminModal(): void {
    this.showCreateAdminModal = false;
    this.resetAdminForm();
  }

  /**
   * Create new admin user
   */
  createAdmin(): void {
    if (!this.validateAdminForm()) {
      this.toastr.warning('Please fill all required fields', 'Validation Error');
      return;
    }

    this.adminService.createAdminUser(this.newAdmin).subscribe({
      next: (response) => {
        console.log('Admin created:', response);
        this.toastr.success('Admin user created successfully', 'Success');
        this.closeCreateAdminModal();
        this.searchUsers(); // Refresh list
      },
      error: (error) => {
        console.error('Error creating admin:', error);
        this.toastr.error(error.message || 'Failed to create admin', 'Error');
      }
    });
  }

  /**
   * Validate admin form
   */
  private validateAdminForm(): boolean {
    return !!(
      this.newAdmin.nicNumber &&
      this.newAdmin.firstName &&
      this.newAdmin.lastName &&
      this.newAdmin.email &&
      this.newAdmin.userName &&
      this.newAdmin.password
    );
  }

  /**
   * Reset admin form
   */
  private resetAdminForm(): void {
    this.newAdmin = {
      nicNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      contactNo: '',
      address: '',
      userName: '',
      password: ''
    };
  }

  /**
   * Get badge class based on role
   */
  getRoleBadgeClass(role: string): string {
    switch(role) {
      case 'Admin': return 'badge bg-danger';
      case 'Manager': return 'badge bg-warning text-dark';
      case 'User': return 'badge bg-success';
      default: return 'badge bg-secondary';
    }
  }

  /**
   * Get status badge class
   */
  getStatusBadgeClass(isBlocked: boolean): string {
    return isBlocked ? 'badge bg-danger' : 'badge bg-success';
  }
}
