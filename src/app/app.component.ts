import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 constructor(public authservice:AuthService,private router: Router){}

 logout(){
  this.authservice.logout().subscribe(()=>{
    this.router.navigate(['']);
  })
 }
}
