import { BehaviorSubject } from 'rxjs';
import { LayoutComponent } from './../layout/layout.component';
import { CategoryService } from './../../service/user-page/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private layoutComponent: LayoutComponent,
    private categoryService: CategoryService
  ) {}

  public list: any;
  private listEMPTY: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  ngOnInit(): void {
    this.layoutComponent.loading(true);
    this.getAllCategory();
    this.listEMPTY.asObservable().subscribe((data) => {
      this.layoutComponent.loading(data);
    });
  }

  private getAllCategory() {
    this.categoryService.getAllCategory().subscribe((resp) => {
      this.list = resp;
      this.listEMPTY.next(false);
    });
  }
}
