import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router : Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email : ['',[Validators.required, Validators.email]],
      password : ['',Validators.required]
    })
  }

  onLogin(){

    this.http.get<any>("http://localhost:3000/posts")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      console.log(user);
      if (user) {
        alert("Login Successfully !!");
        this.loginForm.reset();
        this.router.navigate(['profile']);
      }else{
        alert("User Not Found !!");
        this.loginForm.reset();
      }
    }, err =>{
      alert("Something Went Wrong !!");
    })
  }

}
