import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';


import {Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentuser$=authState(this.auth);

 
  constructor(private auth:Auth){}
  
  login(username:string,password:string){
    return from (signInWithEmailAndPassword(this.auth,username,password));
  }

  signup(name:string,email:string,password:string){
    return from(createUserWithEmailAndPassword(this.auth,email,password)
    ).pipe(switchMap(({user}) => updateProfile(user,{displayName:name})))
  }

  logout(){
    return from (this.auth.signOut());
  }
}

