import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'customers',
        loadComponent: () =>
          import(
            './features/customers/customer-list/customer-list.component'
          ).then((m) => m.CustomerListComponent),
      },
      {
        path: 'add-customer',
        loadComponent: () =>
          import(
            './features/customers/add-customer/add-customer.component'
          ).then((m) => m.AddCustomerComponent),
      },
      {
        path: 'pending-bills',
        loadComponent: () =>
          import('./features/bills/pending-bills/pending-bills.component').then(
            (m) => m.PendingBillsComponent
          ),
      },
      {
        path: 'add-customers-csv',
        loadComponent: () =>
          import(
            './features/customers/add-customers-csv/add-customers-csv.component'
          ).then((m) => m.AddCustomersCsvComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      { path: '', redirectTo: 'customers', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
