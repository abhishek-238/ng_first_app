import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes : Routes = [{
  path: 'create',
  component:CreateUserComponent,
}]

@NgModule({
  declarations: [
    // CreateUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class CreateUserModule { }
