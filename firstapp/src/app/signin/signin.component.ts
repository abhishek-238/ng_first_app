import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  formdata ={
    "fname":'',
    "lname":'',
    "email":'',
    "password":'',
    "cpassword":''
  
  }
  userDetail : Array<Isignin>=[];
  constructor(private _router : Router) { }

  ngOnInit(): void {
  }
  submit(formdata:NgForm){
  const object = {
    fname :formdata?.value.fname,
    lname :formdata?.value.lname,
    email : formdata?.value.email,
    password : formdata?.value.password,
  }
  console.log(object);

  let temp = JSON.parse(localStorage?.getItem('temp') || '[]');
  
  if(temp.length > 0){
    for(let d of temp){
      this.userDetail.push(d);
    }
  }
  this.userDetail.push(object); 

  localStorage.setItem('data',JSON.stringify(this.userDetail));

  localStorage.setItem('temp',JSON.stringify(JSON.parse(localStorage?.getItem('data') || '[]')))

  alert("signup successfully");
  this._router.navigateByUrl('/login');
  
}

}

interface Isignin{
fname:string;
lname:string;
email:string;
password:string;
}
// }
//   submit(formdata:NgForm){
//     console.log("submit") 
//     console.log(formdata.value) 
//   }

// }
