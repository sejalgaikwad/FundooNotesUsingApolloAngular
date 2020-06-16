import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const forgotpassword = gql`
mutation forgotpassword($email:String! ) {
  forgotpassword(email:$email ) {
    message
    success
  }
}
`;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email = new FormControl("", [Validators.required, Validators.email]);

  constructor(public router: Router, public apollo: Apollo, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  forgotPassword(){
    this.apollo.mutate({
      mutation: forgotpassword,
      variables:{
        email: this.email.value
      }
    }).subscribe(data=>{
      console.log('got data', data);
      this.snackBar.open("Forgot Password successfully!!", "ok", { duration: 5000 });
      this.router.navigate(["resetPassword"])
    },(error) => {
      console.log('there was an error sending the query', error); 
      this.snackBar.open("Forgot Password unsuccessfully!!", "ok", { duration: 5000 }); 
  });
  }
}
