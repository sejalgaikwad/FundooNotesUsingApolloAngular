import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const login = gql`
mutation login($email:String! $password:String!) {
  login(email:$email password:$password) {
    message
    success
    token
  }
}
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [Validators.required]);

  constructor( public router: Router, public apollo: Apollo, private snackBar: MatSnackBar) { } 
  ngOnInit(): void {
  }
  hide= true;
  login(){
    this.apollo.mutate({
      mutation: login,
      variables:{
        email: this.email.value,
        password: this.password.value
      }
    }).subscribe(data=>{
      console.log('got data', data);
      this.snackBar.open("Login successfully!!", "ok", { duration: 5000 });
    },(error) => {
      console.log('there was an error sending the query', error);
      this.snackBar.open("Login failed!!", "ok", { duration: 5000 });
    });
  }

  signUp() {
    this.router.navigate(["register"])
  }

  forgotPassword() {
    this.router.navigate(["forgotPassword"])
  }
}
  