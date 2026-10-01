import { StaticService } from './../../service/static.service';
import { BlogService } from './../../service/user-page/blog.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private blogService: BlogService,
    private staticService: StaticService,
  ) {}

  private idBlog: string = '';
  public blog: any;
  public urlImg: string = '';
  public contentsCopy: any;

  ngOnInit(): void {
    this.idBlog = String(this.getIdBlogs());
    this.getContentBlogById();
    this.urlImg = this.staticService.rootUrl + '/downloadFile/blogs/';
  }

  public getIdBlogs() {
    let id: any;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = String(params.get('id'));
    });
    return id;
  }

  public getContentBlogById() {
    this.blogService.getOne(this.idBlog).subscribe((reps) => {
      this.blog = reps;
      this.viewMedia();
    });
  }

  public viewMedia() {
    this.contentsCopy = this.sanitizer.bypassSecurityTrustHtml(
      this.blog.contents
    );
  }
}
