import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

// Models/Interfaces
export interface DashboardData {
  totalUsers: number;
  blockedUsers: number;
  adminUsers: number;
  managerUsers: number;
  regularUsers: number;
  recentUsers: any[];
}

export interface AdminCreateRequest {
  nicNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  address: string;
  userName: string;
  password: string;
}

export interface ChangeRoleRequest {
  newRole: string; // 'Admin', 'Manager', or 'User'
}

export interface SystemLogs {
  currentPage: number;
  pageSize: number;
  totalLogs: number;
  logs: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:5268/api/Admin';

  constructor(private http: HttpClient) { }

  /**
   * Get admin dashboard metrics
   * Returns: Total users, blocked users, role distribution, recent users
   */
  getDashboard(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.baseUrl}/dashboard`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Create a new admin user
   * @param adminRequest Admin user details
   */
  createAdminUser(adminRequest: AdminCreateRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-admin`, adminRequest).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Search users by search term
   * @param searchTerm Search by name, email, or NIC
   */
  searchUsers(searchTerm: string = ''): Observable<any[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<any[]>(`${this.baseUrl}/users/search`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Change user role
   * @param nicNumber User's NIC number
   * @param newRole New role (Admin/Manager/User)
   */
  changeUserRole(nicNumber: string, newRole: string): Observable<any> {
    const request: ChangeRoleRequest = { newRole };
    return this.http.put(`${this.baseUrl}/users/${nicNumber}/role`, request).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get system logs (paginated)
   * @param page Page number
   * @param pageSize Items per page
   */
  getSystemLogs(page: number = 1, pageSize: number = 50): Observable<SystemLogs> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    
    return this.http.get<SystemLogs>(`${this.baseUrl}/system-logs`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Error handler
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error ${error.status}: ${error.message}`;
      
      // Handle specific error messages from backend
      if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }
    
    console.error('AdminService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
