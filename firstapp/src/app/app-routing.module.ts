import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardchildComponent } from './dashboard/dashboardchild/dashboardchild.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {path:'',component:SigninComponent,},
  {path:'login',component:LoginComponent},
  {path:'signin',component:SigninComponent},
  {path:'dashboard',component:DashboardComponent,children:[
    {path:'',component:DashboardchildComponent},
    {path:'dashboardchild',component:DashboardchildComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
