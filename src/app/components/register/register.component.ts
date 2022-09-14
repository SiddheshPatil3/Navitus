import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router : Router) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      fullname : ['',Validators.required],
      mobile : ['',Validators.required],
      email : ['',[Validators.required,Validators.email]],
      password : ['',Validators.required]
    })
  }

  onRegister(){

      this.http.post<any>("http://localhost:3000/posts", this.registerForm.value)
      .subscribe(res =>{
      alert("Register Successfully !!");
      console.log(this.registerForm.value);
      this.registerForm.reset();
      this.router.navigate(['login']);
    }, err => {
      alert("Something Went Wrong");
    })
  }

}
