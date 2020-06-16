import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const login = gql`
mutation login($email: String! $password: String!) {
  login(email: $email password: $password) {
    message
    success
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

  constructor(public apollo: Apollo) { } 
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
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
  