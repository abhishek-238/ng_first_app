import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthoService {
  private IsLogin=false
  constructor() { }
  login( username : string , password : string ) : any{
    var detail : Array<any> = JSON.parse(localStorage.getItem?.('data') || '[]') ;

   var d = detail.find((value) =>{return username == value?.email && password == value?.password});

    if(d){
      console.log(d);
        localStorage.setItem('currentUser',JSON.stringify(d));
        return true;
    }
    
  }
  logout(){
    localStorage.removeItem('currentUser');
  }

  public get loggedIn() : boolean{
    return (localStorage.getItem('currentUser') != null);
  }
  Authentication(){
    this.IsLogin=true
  }
  GetAuthenticate(){
    return this.IsLogin
  }
}
