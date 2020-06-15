import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor() { }
  firstName = new FormControl("", [Validators.required]);
  lastName = new FormControl("", [Validators.required]);
  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [Validators.required]);
  confirmpassword = new FormControl("", [Validators.required]);
 
  ngOnInit(): void {
  }
  hide= true;
  register(){
    console.log(this.firstName.value);
    console.log(this.lastName.value);
    console.log(this.email.value);
    console.log(this.password.value);
    console.log(this.confirmpassword.value);
  }
}
