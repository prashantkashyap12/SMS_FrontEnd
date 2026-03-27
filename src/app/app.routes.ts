import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'signin', loadComponent: () => import('./userAuth/signin/signin.component').then(m => m.SigninComponent)},
    {path: 'signup', loadComponent: () => import('./userAuth/signup/signup.component').then(m => m.SignupComponent)},
    {path: 'forget-password', loadComponent: () => import('./userAuth/forget/forget.component').then(m => m.ForgetComponent)},
    {path: 'verify', loadComponent: () => import('./userAuth/verify/verify.component').then(m => m.VerifyComponent)},

     {path: 'dashboard', loadComponent: () => import('./SchoolManagement/dashboard/dashboard.component').then(m => m.DashboardComponent)},
];
