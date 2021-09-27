import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit,OnChanges {

  employeeId! : number;
  employeeData : any;
  edit :boolean = false;
  employeeDetailForm! : FormGroup;
  submitted = false;

  @Input() empData: any;
  @Output() onClick = new EventEmitter();
  @Output() addUser = new EventEmitter();

  constructor(private _activateRoute : ActivatedRoute,
    private http : HttpClient,
    private fb : FormBuilder) {

      this.employeeDetailForm = this.fb.group({
        id : [''],
        first_name : ['',Validators.required],
        email : ['',Validators.required],
        last_name : ['',Validators.required]

      });

      if(this._activateRoute.snapshot.params?.id){
        this.employeeId = this._activateRoute.snapshot.params?.id;
        this.edit=true;
      }
   }
  ngOnChanges(): void {
    if(this.empData != undefined && this.empData != null){
      this.employeeDetailForm.get('id')?.setValue(this.empData?.id);
      this.employeeDetailForm.get('first_name')?.setValue(this.empData?.first_name);
      // this.employeesData=res;
      this.employeeDetailForm.get('email')?.setValue(this.empData?.email);

      this.employeeDetailForm.get('last_name')?.setValue(this.empData?.last_name);
      this.edit=true;
    }

  }

  ngOnInit(): void {
   
    if(this.edit && this.employeeId != null && this.employeeId != undefined){
      this.getEmployeeDetails();
      }
    
  }

  

  get f(){return this.employeeDetailForm.controls;}

  getEmployeeDetails(){
    this.http.get(''+this.employeeId).subscribe(res=>{
      console.log(res);
      this.employeeData= res;
      this.employeeDetailForm.get('first_name')?.setValue(this.employeeData?.employee_name);
      // this.employeesData=res;
      this.employeeDetailForm.get('email')?.setValue(this.employeeData?.employee_age);

      this.employeeDetailForm.get('last_name')?.setValue(this.employeeData?.employee_salary);


    },(err) => {
        console.error(err);
    });
    
  }
  addEmployee(){
    this.submitted = true;
    if(this.employeeDetailForm.invalid){
      return;
    }
    const json = 	{
      first_name:this.employeeDetailForm.get('first_name')?.value,
      last_name:this.employeeDetailForm.get('last_name')?.value,
      email:this.employeeDetailForm.get('email')?.value
    }

    try{
      this.http.post('https://reqres.in/api/users',json).subscribe(res=>{
        console.log(res);
        this.submitted=false;
        this.employeeDetailForm.reset();
          this.addUser.emit(res);
      });

    }catch(e){
    }

  }
  updateEmployee(){
    const json : IUSer = 	{
      first_name :this.employeeDetailForm.get('first_name')?.value,
      last_name:this.employeeDetailForm.get('last_name')?.value,
      email:this.employeeDetailForm.get('email')?.value
    }

    try{
      this.http.put('https://reqres.in/api/users/'+this.employeeId,json).subscribe(res=>{
        console.log(res);

      });

    }catch(e){

    }
  }

}
interface IUSer{
  first_name:string;
  last_name:string;
  email:string;
}
