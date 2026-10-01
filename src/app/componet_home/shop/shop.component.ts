import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { LayoutComponent } from './../layout/layout.component';
import { StaticService } from './../../service/static.service';
import { CategoryService } from './../../service/user-page/category.service';
import { ProductService } from './../../service/user-page/product.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  constructor(
    private router: Router,
    private title: Title,
    private route: ActivatedRoute,
    private staticService: StaticService,
    private productService: ProductService,
    private layoutComponent: LayoutComponent,
    private caterogyService: CategoryService
  ) {}

  public rootUrl: string =
    this.staticService.rootUrl + '/downloadFile/products/';
  private originalList: any[] = [];
  public list: any[] = [];
  public listSortLTH: any[] = [];
  public listSortHTL: any[] = [];
  private listOfProtein: any[] = [];
  private listOfAccessory: any[] = [];
  private listOfAllProduct: any[] = [];
  private listOfProductByCategory: any[] = [];
  public searchValue: string = '';
  public titlePage: any;
  public seachSmall: any;
  private listEMPTY: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  public loading: boolean = false;
  public showList: boolean = false;
  public showListLTH: boolean = true;
  public showListHTL: boolean = true;
  private sortLTH: Subscription | undefined;
  private sortHTL: Subscription | undefined;

  ngOnInit(): void {
    this.checkAccessory();

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnDestroy() {
    this.sortLTH?.unsubscribe();
    this.sortHTL?.unsubscribe();
  }

  public checkAccessory() {
    this.layoutComponent.loading(true);
    let type: any;
    this.route.url.subscribe((ulr) => {
      type = ulr[0].path;
    });
    switch (type) {
      case 'shop':
        let param: any;
        this.route.paramMap.subscribe((params: ParamMap) => {
          param = String(params.get('type'));
        });
        switch (param) {
          case 'protein':
            this.title.setTitle('Protein Shop');
            this.titlePage = 'PROTEIN SHOP';
            this.listOfAccessory = [];
            this.listOfAllProduct = [];
            this.listOfProductByCategory = [];
            if (sessionStorage.getItem('listProtein') != null) {
              this.listOfProtein = JSON.parse(
                sessionStorage.getItem('listProtein') || ''
              );
              this.list = this.listOfProtein;
              setTimeout(() => {
                this.listEMPTY.next(false);
                this.createSortList(this.listOfProtein);
              }, 2000);
            } else {
              this.getProteinList();
            }
            this.listEMPTY.asObservable().subscribe((data) => {
              this.layoutComponent.loading(data);
            });
            break;
          case 'accessory':
            this.title.setTitle('Accessory Shop');
            this.titlePage = 'Accessory SHOP';
            this.listOfProtein = [];
            this.listOfAllProduct = [];
            this.listOfProductByCategory = [];
            if (sessionStorage.getItem('listAccessory') != null) {
              this.listOfAccessory = JSON.parse(
                sessionStorage.getItem('listAccessory') || ''
              );
              this.list = this.listOfAccessory;
              setTimeout(() => {
                this.listEMPTY.next(false);
                this.createSortList(this.listOfAccessory);
              }, 2000);
            } else {
              this.getAccessoryList();
            }
            this.listEMPTY.asObservable().subscribe((data) => {
              this.layoutComponent.loading(data);
            });
            break;
          case 'all':
            this.title.setTitle('All shop products');
            this.titlePage = 'All SHOP PRODUCTS';
            this.listOfProtein = [];
            this.listOfAccessory = [];
            this.listOfProductByCategory = [];
            if (sessionStorage.getItem('listProducts') != null) {
              this.listOfAllProduct = JSON.parse(
                sessionStorage.getItem('listProducts') || ''
              );
              this.list = this.listOfAllProduct;
              setTimeout(() => {
                this.listEMPTY.next(false);
                this.createSortList(this.listOfAllProduct);
              }, 2000);
            } else {
              this.getAllProducts();
            }
            this.listEMPTY.asObservable().subscribe((data) => {
              this.layoutComponent.loading(data);
            });
            break;
          default:
            break;
        }
        break;
      case 'category':
        let catid: any;
        this.route.url.subscribe((ulr) => {
          catid = ulr[1].path;
        });
        this.caterogyService.getCategoryDetail(catid).subscribe((resp) => {
          this.title.setTitle(resp.name);
          this.titlePage = 'CATEGORY: ' + resp.name;
        });
        this.listOfProtein = [];
        this.listOfAccessory = [];
        this.listOfAllProduct = [];
        this.getListProductByCategory(catid);
        this.listEMPTY.asObservable().subscribe((data) => {
          this.layoutComponent.loading(data);
        });
        break;
      default:
        break;
    }
  }

  public getProteinList() {
    this.productService.getProteins().subscribe((resp) => {
      this.listOfProtein = resp;
      this.list = this.listOfProtein;
      this.originalList = resp;
      sessionStorage.setItem('listProtein', JSON.stringify(resp));
      this.listEMPTY.next(false);
      setTimeout(() => {
        this.createSortList(this.listOfProtein);
      }, 2000);
    });
  }

  public getAccessoryList() {
    this.productService.getAccessorys().subscribe((resp) => {
      this.listOfAccessory = resp;
      this.list = this.listOfAccessory;
      this.originalList = resp;
      sessionStorage.setItem('listAccessory', JSON.stringify(resp));
      this.listEMPTY.next(false);
      setTimeout(() => {
        this.createSortList(this.listOfAccessory);
      }, 2000);
    });
  }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe((resp) => {
      this.listOfAllProduct = resp;
      this.list = this.listOfAllProduct;
      this.originalList = resp;
      sessionStorage.setItem('listProducts', JSON.stringify(resp));
      this.listEMPTY.next(false);
      setTimeout(() => {
        this.createSortList(this.listOfAllProduct);
      }, 2000);
    });
  }

  public getListProductByCategory(catid: string) {
    this.productService.getAllProductByCategory(catid).subscribe((resp) => {
      this.listOfProductByCategory = resp;
      this.list = this.listOfProductByCategory;
      this.originalList = resp;
      this.listEMPTY.next(false);
      setTimeout(() => {
        this.createSortList(this.listOfProductByCategory);
      }, 2000);
    });
  }
  private limitSize: number = 8;
  public loadMoreProduct() {
    this.loading = true;
    setTimeout(() => {
      this.limitSize += 8;
      this.loading = false;
    }, 1000);
  }

  public changerLimit(number: number) {
    this.limitSize = number;
  }

  public limitProduct(index: number): boolean {
    if (index < this.limitSize) {
      return true;
    } else {
      return false;
    }
  }

  public search() {
    this.seachSmall = this.searchValue;
  }

  public sort(key: string) {
    switch (key) {
      case 'low to high':
        this.showList = true;
        this.showListLTH = false;
        this.showListHTL = true;
        break;
      case 'high to low':
        this.showList = true;
        this.showListLTH = true;
        this.showListHTL = false;
        break;
      default:
        this.showList = false;
        this.showListLTH = true;
        this.showListHTL = true;
        break;
    }
  }

  private createSortList(list: any) {
    this.sortLTH = this.productService
      .sortList('LTH', list)
      .subscribe((data) => {
        this.listSortLTH = data;
      });
    this.sortHTL = this.productService
      .sortList('HTL', list)
      .subscribe((data) => {
        this.listSortHTL = data;
      });
  }
}
