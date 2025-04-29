import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard'; // Import the AuthGuard
import { ProfileComponent } from './components/profile/profile.component';
export const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Public access
  { path: 'login', component: LoginComponent }, // Public access
  { path: 'register', component: RegisterComponent }, // Public access
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Protected by AuthGuard
  { path: 'profile', component: ProfileComponent },
  // Add other protected routes here
];
