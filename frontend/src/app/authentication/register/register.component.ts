import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = { email: '', password: '', profileImage: null };
  constructor(public __service: AuthService, public router: Router) { }

  ngOnInit() {
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.user.profileImage = file;
    }
  }

  onSubmit() {
    console.log('User Data:', this.user);
    this.__service.registerUser(this.user).subscribe(res => {
      console.log(res)
      alert(res.message);
      this.router.navigate(['/auth/login']);
    })
  }

}


