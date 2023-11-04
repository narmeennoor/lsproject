import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {HotToastService} from '@ngneat/hot-toast'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true; // for password visibility toggle
  loginForm =new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required),
  })
constructor(private authservice:AuthService,
  private router:Router,
  private toast:HotToastService
  ){}


  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
  submit(){
    if(!this.loginForm.valid){
      return;
    }
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
  
    if (email && password) {
      this.authservice.login(email, password).pipe(
        this.toast.observe({
          success:'logged in successfully',
          loading: 'logging in...',
          error:"There is an error",
          
        })
      ).subscribe(() => {
        this.router.navigate(['\home']);
});
    }

  }

}


