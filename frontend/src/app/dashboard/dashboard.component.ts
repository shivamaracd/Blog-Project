import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class   DashboardComponent implements OnInit {
  user: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.http.get(`http://localhost:5000/dashboard/${userId}`)
        .subscribe((data: any) => {
          this.user = data;
        }, error => {
          console.error('Error fetching user data:', error);
        });
    }
  }
}

