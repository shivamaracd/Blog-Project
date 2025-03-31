import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogForm!: FormGroup;
  blogs: any[] = [];
  isEditing = false;
  editingId: number | null = null;
  selectedFile!: File;

  constructor(private fb: FormBuilder, private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    });
    this.getBlogs();
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const userId = sessionStorage.getItem('userId');
    const formData = new FormData();
    formData.append('title', this.blogForm.get('title').value);
    formData.append('description', this.blogForm.get('description').value);
    formData.append('userId', userId);
    if (this.selectedFile) {
      formData.append('blog_image', this.selectedFile);
    }

    if (this.isEditing && this.editingId !== null) {
      this.blogService.updateBlog(this.editingId, formData).subscribe(() => {
        this.isEditing = false;
        this.editingId = null;
        this.blogForm.reset();
        this.getBlogs();
      });
    } else {
      this.blogService.addBlog(formData).subscribe(() => {
        this.blogForm.reset();
        this.getBlogs();
      });
    }
  }

  getBlogs() {
    const userId = sessionStorage.getItem('userId');
    this.blogService.getBlogs(userId).subscribe((data: any) => {
      console.log(data)
      this.blogs = data;
    });
  }



  editBlog(blog: any) {
    this.isEditing = true;
    this.editingId = blog.id;
    this.blogForm.patchValue({
      title: blog.title,
      description: blog.description
    });
  }

  deleteBlog(id: number) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(id).subscribe(() => {
        this.getBlogs();
      });
    }
  }

  viewBlog(id: number) {
    this.router.navigate(['/blog/blog', id]); // Navigate to the blog detail page
  }
}
