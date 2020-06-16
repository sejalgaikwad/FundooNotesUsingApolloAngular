import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const register = gql`
mutation register( $firstName:String! $lastName:String! $email:String! $password:String!) {
  register(firstName:$firstName lastName:$lastName email:$email password:$password) {
    message
    success
    token
  }
}
`;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstName = new FormControl("", [Validators.required]);
  lastName = new FormControl("", [Validators.required]);
  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [Validators.required]);
  confirmpassword = new FormControl("", [Validators.required]);

  constructor( public router: Router, public apollo: Apollo, private snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
  }

  hide= true;
  register(){
    this.apollo.mutate({
      mutation: register,
      variables:{
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        password: this.password.value
      }
    }).subscribe(data=>{
      console.log('got data', data);
      this.snackBar.open("Registered successfully!!", "ok", { duration: 5000 });
      this.router.navigate(["login"])
    },(error) => {
      console.log('there was an error sending the query', error);
      this.snackBar.open("Register failed!!", "ok", { duration: 5000 });
    });
  }

  signIn() {
    this.router.navigate(["login"])
  }
}
 
