import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthoService } from 'src/app/authentication/autho.service';

@Component({
  selector: 'app-dashboardchild',
  templateUrl: './dashboardchild.component.html',
  styleUrls: ['./dashboardchild.component.css']
})
export class DashboardchildComponent implements OnInit {
  current_user:any;

  constructor(private _router:Router,private _authoservice:AuthoService) { }

  ngOnInit(): void {
    this.current_user=JSON.parse(localStorage.getItem('currentUser')  || '[]');
    console.log(this.current_user)
  }
  logout(){
    this._authoservice.logout();
    this._router.navigate(["/login"])
  }

}
