import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  password = new FormControl("", [Validators.required]);

  constructor() { }

  ngOnInit(): void {
  }
  hide=true;
  resetPassword(){
    console.log(this.password.value);  
  }

}
