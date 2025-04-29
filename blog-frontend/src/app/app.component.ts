import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule], // Import necessary modules
})
export class AppComponent {
  showLogoutButton: boolean = true; // Toggle to control visibility of the logout button

  constructor(private router: Router) {
    // Subscribe to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide logout button on specific routes
        const restrictedRoutes = ['/login', '/register', '/'];
        this.showLogoutButton = !restrictedRoutes.includes(event.url);
      }
    });
  }

  logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
