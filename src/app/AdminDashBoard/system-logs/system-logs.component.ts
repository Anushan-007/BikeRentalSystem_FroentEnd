import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService, SystemLogs } from '../../Services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-system-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-logs.component.html',
  styleUrl: './system-logs.component.css'
})
export class SystemLogsComponent implements OnInit {
  logs: SystemLogs = {
    currentPage: 1,
    pageSize: 50,
    totalLogs: 0,
    logs: []
  };
  
  loading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 50;
  currentDate: Date = new Date();

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  /**
   * Load system logs from AdminController
   */
  loadLogs(): void {
    this.loading = true;
    this.adminService.getSystemLogs(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        console.log('System logs:', data);
        this.logs = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading logs:', error);
        this.toastr.error('Failed to load system logs', 'Error');
        this.loading = false;
      }
    });
  }

  /**
   * Navigate to next page
   */
  nextPage(): void {
    this.currentPage++;
    this.loadLogs();
  }

  /**
   * Navigate to previous page
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLogs();
    }
  }

  /**
   * Refresh logs
   */
  refreshLogs(): void {
    this.currentPage = 1;
    this.loadLogs();
  }

  /**
   * Get log level badge class
   */
  getLogLevelClass(level: string): string {
    switch(level?.toLowerCase()) {
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'info';
      case 'success': return 'success';
      default: return 'secondary';
    }
  }
}
