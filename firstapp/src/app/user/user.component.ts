import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  
})
export class UserComponent implements OnInit {

  employeesData :Array<any>=[];
  empDetail : any;
  searchText:any;



  constructor(private http : HttpClient,
    private _router : Router) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }


  getEmployeeList(){
    this.http.get<any>('https://reqres.in/api/users?page=2').subscribe(res=>{
      console.log(res);
      this.employeesData=res?.data;
    },(err) => {
        console.error(err);
    });
    
  }

  getEmployeeDetail(data:any){
    this.empDetail = data;

    // this._router.navigateByUrl("user/create")
    // this._router.navigate(['user/create',{id:id}]);
  }

  updateEmployee(event : any){
    const json : IUSer = 	{
      id:this.empDetail?.id,
      first_name :event?.first_name,
      last_name:event?.last_name,
      email:event?.email
    }

    try{
      this.http.put('https://reqres.in/api/users/'+this.empDetail?.id,json).subscribe(res=>{
        console.log(res);
        this.employeesData.map((value,index)=>{
          if(value?.id==this.empDetail?.id){
            console.log(this.employeesData);
            console.log(index);
            console.log(json)
            this.employeesData[index]=json;
          }
        })
      });

    }catch(e){

    }
  }
  addData(event:any){
    console.log(event);
    this.employeesData.push(event);

  }

  deleteEmployee(id : number){
    if (window.confirm('Are you sure, you want to delete?')){
      this.http.delete('https://reqres.in/api/users/'+id).subscribe(data => {
        // this.getEmployeeList();
        let index = this.employeesData.findIndex(value=>value.id==id)
        console.log(index);
        this.employeesData.splice(index,1);
      })
    }

  }

}

interface IUSer{
  id:number;
  first_name:string;
  last_name:string;
  email:string;
}
interface Iresponce{
  status:string;
  data:Array<IUSer>;
  message:string;
}
