import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, public serv: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log('Login done!', this.loginForm.value);
    this.serv.userLogin(this.loginForm.value).subscribe(res => {
      console.log("shivam::", res)
      this.router.navigate(['/dashboard']);
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('username', res.user.email);
      sessionStorage.setItem('userId', res.user.id);
    },err => {
        console.log(err)
        alert(err)
      });
  }
}

