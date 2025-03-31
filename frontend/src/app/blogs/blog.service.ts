import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:5000/blogs';

  constructor(private http: HttpClient) {}

  getBlogs(userId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  addBlog(blog: FormData): Observable<any> {
    return this.http.post(this.apiUrl, blog);
  }

  updateBlog(id: number, blog: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, blog);
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getBlogById(id: number, user_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/${user_id}`);
  }

}
