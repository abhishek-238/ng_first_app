import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthoGuard } from './authentication/autho.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardchildComponent } from './dashboard/dashboardchild/dashboardchild.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {path:'',component:LoginComponent,},
  {path:'login',component:LoginComponent},
  {path:'signin',component:SigninComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthoGuard], children:[
    {path:'',component:DashboardchildComponent},
    {path:'dashboardchild',component:DashboardchildComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
