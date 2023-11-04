import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

export function passwordMatchValidator():ValidatorFn{
  return (control:AbstractControl):ValidationErrors|null=>{
    const password = control.get('password')?.value;
    const confirmpassword = control.get('confirmpassword')?.value;

    if (password&&confirmpassword&&password!==confirmpassword){
      return{
        passwordsdontmatch:true
      }
    }
    return null;
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  hide = true;

  signupform=new FormGroup({
    name:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.email,Validators.required]),
    password:new FormControl('',Validators.required),
    confirmpassword:new FormControl('',Validators.required)
  },{validators:passwordMatchValidator()})


  constructor(private authservice:AuthService,private toast:HotToastService,private router:Router){

  }

  get name(){
    return this.signupform.get('name');
  }

  get email(){
    return this.signupform.get('email');
  }

  get password(){
    return this.signupform.get('password');
  }

  get confirmpassword(){
    return this.signupform.get('confirmpassword');
  }

  // submit(){
  //   if(this.signupform.valid){
  //     return;
  //   }
  //   const name1 = this.signupform.get('name')?.value;
  //  const {email,password}=this.signupform.value;
  // this.authservice.signup(name1,email,password).pipe(
  //   this.toast.observe({
  //     success:"Signed up successfully",
  //     loading:"loading",
  //     error:({message})=>'$(message)'
  //   })
  // ).subscribe(()=>{
  //   this.router.navigate(['/home']);
  // })
 
  // }
  submit() {
    if (this.signupform.valid) {
      const { name, email, password } = this.signupform.value;
  
      if (email && password && name) {
        this.authservice.signup(name, email, password).pipe(
          this.toast.observe({
            success: "Signed up successfully",
            loading: "Signing in...",
            error: ({ message }) => `${message}`,
          })
        ).subscribe(() => {
          this.router.navigate(['/home']);
        });
      }
    }
  }
  

}

