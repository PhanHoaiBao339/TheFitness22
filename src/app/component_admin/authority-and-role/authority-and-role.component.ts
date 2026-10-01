import { data } from 'jquery';
import { AccountManagerService } from './../../service/admin-page/account-manager.service';
import { AuthorityManagerService } from './../../service/admin-page/authority-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authority-and-role',
  templateUrl: './authority-and-role.component.html',
  styleUrls: ['./authority-and-role.component.scss'],
})
export class AuthorityAndRoleComponent implements OnInit {
  constructor(
    private accountManagerService: AccountManagerService,
    private authorityManagerService: AuthorityManagerService
  ) {}

  ngOnInit(): void {
    this.loadAllAuthority();
    this.loadAllAccount();
    this.loadAllRole();
  }

  public listAllRole: any;
  public listAllAuthority: any;
  public listAllAccount: any;
  public loading: boolean = true;

  private loadAllAuthority() {
    this.loading = true;
    this.authorityManagerService.getAllAuthority().subscribe((data) => {
      this.listAllAuthority = data;
      this.loading = false;
    });
  }
  private loadAllRole() {
    this.authorityManagerService.getAllRole().subscribe((data) => {
      this.listAllRole = data;
    });
  }
  private loadAllAccount() {
    this.accountManagerService.getAllAdmin().subscribe((data) => {
      this.listAllAccount = data;
    });
  }

  public authority_of(acc: any, role: any) {
    if (this.listAllAuthority) {
      return this.listAllAuthority.find(
        (au: { account: { username: any }; role: { id: any } }) =>
          au.account.username == acc.username && au.role.id == role.id
      );
    }
  }

  public authority_changed(acc: any, role: any) {
    let authority = this.authority_of(acc, role);
    if (authority) {
      this.revoke_authority(authority);
    } else {
      authority = { account: acc, role: role };
      this.grant_authority(authority);
    }
  }

  private grant_authority(authority: any) {
    this.authorityManagerService.save(authority).subscribe(data=>{
      this.listAllAuthority.push(data);
      alert("Authorization successful!");
    },error=>{
      alert("Authorization failed!!");
    })

  }

  private revoke_authority(authority: any) {
    this.authorityManagerService.delete(authority.id).subscribe(
      (data) => {
        var index = this.listAllAuthority.findIndex(
          (a: { id: any }) => a.id == authority.id
        );
        this.listAllAuthority.splice(index, 1);
        alert('Permissions revoked successfully!!');
      },
      (eror) => {
        alert("Permissions revoked failed!");
      }
    );

  }
}
