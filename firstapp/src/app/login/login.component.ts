import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { Router } from '@angular/router'
import { AuthoService } from '../authentication/autho.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
formdata:FormGroup;
errormessage='';

  constructor(private _router:Router,private _authoservice:AuthoService) { 
    if(_authoservice.loggedIn){
      this._authoservice.Authentication();
      this._router.navigate(["/dashboard"])
    }
    this.formdata = new FormGroup({
      "Userid":new FormControl('',Validators.required),
      "Password":new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
  }

  Submit(){
    console.log(this.formdata);
    let user = (this.formdata.value)
    if(this._authoservice.login(user.Userid, user.Password)){
      this._authoservice.Authentication();
      this._router.navigate(["/dashboard"])
    }
    else{
      this.errormessage = "Invalid Userid or Password !"; 
      alert("wrong username and password");
    }
    // if(user.Userid=="abhishekraj1jnp@gmail.com" && user.Password =="1234"){
      // this._authoservice.Authentication();
      // this._router.navigate(["/dashboard"])

    // }
    // else{
    //   this.errormessage = "Invalid Userid or Password !"; 
    // }
  }
}
