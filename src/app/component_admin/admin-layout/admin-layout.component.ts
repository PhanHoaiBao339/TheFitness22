import { Router } from '@angular/router';
import { StaticService } from './../../service/static.service';
import { AuthService } from './../../service/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private staticService: StaticService
  ) {}

  public Role: string = 'ADMIN';
  public AdminAvatar: string = 'No_image_available.png';
  public titlepage$ = new BehaviorSubject<string>('');
  public isLoggedFullname$: Observable<string> = new Observable<string>();
  public isLoggedDire$: Observable<boolean> = new Observable<boolean>();
  public isLoggedAdmin$: Observable<boolean> = new Observable<boolean>();
  public rootUrl: string =
    this.staticService.rootUrl + '/downloadFile/account/';

  ngOnInit(): void {
    this.load();
    this.authService.isLoggedSuccess().subscribe((data) => {
      if (data) {
        setTimeout(() => {
          this.titlepage$.next(document.title);
          this.isLoggedDire$ = this.authService.isLoggedDire();
          this.isLoggedAdmin$ = this.authService.isLoggedAdmin();
          this.isLoggedFullname$ = this.authService.getLoggedFullname();
          this.authService.getLoggedPhoto().subscribe((data) => {
            if (data != '') {
              this.AdminAvatar = data;
            }
          });
          this.authService.isLoggedDire().subscribe((data) => {
            if (data) {
              this.Role = 'DIRECTOR';
            }
          });
        }, 1000);
      }
    });
  }

  public changeTitlePage(title: string) {
    this.titlepage$.next(title);
  }

  public logout() {
    this.authService.logout();
    this.AdminAvatar = 'No_image_available.png';
    this.router.navigate(['/home']);
  }

  private load() {
    let sidebar = <HTMLElement>document.querySelector('.sidebar');
    let closeBtn = <HTMLElement>document.querySelector('#btn');
    let searchBtn = <HTMLElement>document.querySelector('.bx-search');

    closeBtn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      menuBtnChange();
    });

    searchBtn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      menuBtnChange();
    });

    function menuBtnChange() {
      if (sidebar.classList.contains('open')) {
        closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
      } else {
        closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
      }
    }
  }
}
