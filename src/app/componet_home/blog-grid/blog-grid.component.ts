import { LayoutComponent } from './../layout/layout.component';
import { Router, ActivatedRoute } from '@angular/router';
import { StaticService } from './../../service/static.service';
import { BlogService } from './../../service/user-page/blog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.scss'],
})
export class BlogGridComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private staticService: StaticService,
    private layoutComponent: LayoutComponent,
  ) {}

  public urlImg: string = '';
  public listData: any[] = [];
  public loading: boolean = false;

  ngOnInit(): void {
    this.urlImg = this.staticService.rootUrl + '/downloadFile/blogs/';
    this.checkTopic();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  public getAllBlogs() {
    this.blogService.getAll().subscribe((resp) => {
      this.listData = resp;
      this.layoutComponent.loading(false);
    });
  }

  public getBlogByTopic(topic: string) {
    this.blogService.getBlogByTopic(topic).subscribe((resp) => {
      this.listData = resp;
      console.log(resp);
      this.layoutComponent.loading(false);
    });
  }

  public showTopicName(topicname: string) {
    switch (topicname) {
      case 'TTN':
        return 'Thể Hình Nam';

      case 'TTNN':
        return 'Thể Hình Nữ';

      case 'GATH':
        return 'Giáo Án Thể Hình';

      case 'KTTH':
        return 'Kiến Thức Thể Hình';

      case 'DDTH':
        return 'Dinh Dưỡng Thể Hình';

      case 'TTTH':
        return 'Tin Tức Thể Hình';

      case 'TTNC':
        return 'Tập Theo Nhóm Cơ';

      default:
        return 'Thông Tin Thể Hình';
    }
  }

  public checkTopic() {
    this.layoutComponent.loading(true);
    let type: any;
    this.route.url.subscribe((ulr) => {
      type = ulr[1].path;
    });
    if (type == 'all') {
      this.getAllBlogs();
    } else {
      this.getBlogByTopic(type);
    }
  }

  private limitSize: number = 6;
  public loadMoreBlogs() {
    this.loading = true;
    setTimeout(() => {
      this.limitSize += 6;
      this.loading = false;
    }, 1000);
  }

  public limitBlogs(index: number): boolean {
    if (index < this.limitSize) {
      return true;
    } else {
      return false;
    }
  }
}
