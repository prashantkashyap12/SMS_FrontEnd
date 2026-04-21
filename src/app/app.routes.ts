import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'signin', loadComponent: () => import('./userAuth/signin/signin.component').then(m => m.SigninComponent)},
    {path: 'signup', loadComponent: () => import('./userAuth/signup/signup.component').then(m => m.SignupComponent)},
    {path: 'forget-password', loadComponent: () => import('./userAuth/forget/forget.component').then(m => m.ForgetComponent)},
    {path: 'verify', loadComponent: () => import('./userAuth/verify/verify.component').then(m => m.VerifyComponent)},
    {path: 'dashboard', loadComponent: () => import('./SchoolManagement/dashboard/dashboard.component').then(m => m.DashboardComponent)},

    // Configration
    {path:'class', loadComponent:()=> import('./SchoolManagement/Configrations/class/class.component').then(m=>m.ClassComponent)},
    {path:'session', loadComponent:()=>import('./SchoolManagement/Configrations/section/section.component').then(m=>m.SectionComponent)},
    {path:'academic-year', loadComponent:()=>import('./SchoolManagement/Configrations/academic-year/academic-year.component').then(m=>m.AcademicYearComponent)},
    {path:'create-class', loadComponent:()=>import('./SchoolManagement/Configrations/create-class/create-class.component').then(m=>m.CreateClassComponent)},
    {path:'Fee-Type', loadComponent:()=>import('./SchoolManagement/Configrations/fee-type/fee-type.component').then(m=>m.FeeTypeComponent)},
    {path:'Fee-Stracture', loadComponent:()=>import('./SchoolManagement/Configrations/fee-stracture/fee-stracture.component').then(m=>m.FeeStractureComponent)},
    {path:'Create-Role', loadComponent:()=>import('./SchoolManagement/Configrations/create-role/create-role.component').then(m=>m.CreateRoleComponent)},    
    {path:'Create-User', loadComponent:()=>import('./SchoolManagement/Configrations/user-role/user-role.component').then(m=>m.UserRoleComponent)},    
    {path:'User-Approval', loadComponent:()=>import('./SchoolManagement/Configrations/approve-user/approve-user.component').then(m=>m.ApproveUserComponent)},    
    {path:'Invoice-Manager', loadComponent:()=>import('./SchoolManagement/Configrations/print-invoice/print-invoice.component').then(m=>m.PrintInvoiceComponent)},
    {path:'teacher-manager', loadComponent:()=>import('./SchoolManagement/Configrations/teacher-manager/teacher-manager.component').then(m=>m.TeacherManagerComponent)},
    
    // Student Management
    {path:'add-student',loadComponent:()=>import('./SchoolManagement/StudentManagment/add-student/add-student.component').then(m=>m.AddStudentComponent)},
    {path:'view-student', loadComponent:()=>import('./SchoolManagement/StudentManagment/student-filter/student-filter.component').then(m=>m.StudentFilterComponent)},
    {path:'student-doc', loadComponent:()=>import('./SchoolManagement/StudentManagment/student-doc/student-doc.component').then(m=>m.StudentDocComponent)},
    {path:'daily_attenduce', loadComponent:()=>import('./SchoolManagement/StudentManagment/attenduce-manger/attenduce-manger.component').then(m=>m.AttenduceMangerComponent)},
    {path:'check_attenduce', loadComponent:()=>import('./SchoolManagement/StudentManagment/view-attenduce/view-attenduce.component').then(m=>m.ViewAttenduceComponent)},
    {path:'ViewIdCard/:id', loadComponent:()=>import('./SchoolManagement/StudentManagment/student-id-card/student-id-card.component').then(m=>m.StudentIdCardComponent)},
    {path:'ViewProfile/:id', loadComponent:()=>import('./SchoolManagement/StudentManagment/student-doc/student-doc.component').then(m=>m.StudentDocComponent)},

    // Fee Management
    {path:'collection-fee', loadComponent:()=>import('./SchoolManagement/FeeManagment/fee-collection/fee-collection.component').then(m=>m.FeeCollectionComponent)},
    {path:'manager-fee', loadComponent:()=>import('./SchoolManagement/FeeManagment/fee-manager/fee-manager.component').then(m=>m.FeeManagerComponent)},
    {path:'print-fee', loadComponent:()=>import('./SchoolManagement/FeeManagment/fee-slip/fee-slip.component').then(m=>m.FeeSlipComponent)},
    
    // Kharcha Management
    {path:'add-kharcha', loadComponent:()=>import('./SchoolManagement/Kharcha/add-kharcha/add-kharcha.component').then(m=>m.AddKharchaComponent)},
    {path:'view-kharcha', loadComponent:()=>import('./SchoolManagement/Kharcha/show-kharcha/show-kharcha.component').then(m=>m.ShowKharchaComponent)},


    ];
