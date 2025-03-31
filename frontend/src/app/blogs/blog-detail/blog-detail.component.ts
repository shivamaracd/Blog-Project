import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: any;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const user_id:any  = sessionStorage.getItem('userId');
    if (id) {
      this.blogService.getBlogById(Number(id),user_id).subscribe((data: any) => {
        this.blog = data;
      });
    }
  }
}
