import { ProductService } from './../../service/user-page/product.service';
import { CommentService } from './../../service/user-page/comment.service';
import { LikeService } from './../../service/user-page/like.service';
import { AuthService } from './../../service/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayoutComponent } from './../layout/layout.component';
import { SizeService } from './../../service/user-page/size.service';
import { StaticService } from './../../service/static.service';
import { ShoppingCartService } from './../../service/user-page/shopping-cart.service';
import { FlavorOrColorService } from './../../service/user-page/flavor-or-color.service';
import { CategoryService } from './../../service/user-page/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private likeService: LikeService,
    private authService: AuthService,
    private sizeService: SizeService,
    private staticService: StaticService,
    private productService: ProductService,
    private commentService: CommentService,
    private layoutComponent: LayoutComponent,
    private categoryService: CategoryService,
    private shoppingCartService: ShoppingCartService,
    private flavorOrColorService: FlavorOrColorService
  ) {}
  public imageAccountUrl: string =
    this.staticService.rootUrl + '/downloadFile/account/';
  public rootUrl: string =
    this.staticService.rootUrl + '/downloadFile/products/';
  public isLoggedAdmin$: Observable<boolean> = new Observable<boolean>();
  public isLoggedDire$: Observable<boolean> = new Observable<boolean>();
  private idproduct: string = '';
  public username: string = '';
  public listSize: any[] = [];
  public activeSize: Boolean = false;
  public listFlavorOrColor: any[] = [];
  public activeFlavor: Boolean = false;
  public activeFlavorOrColor: Boolean = false;
  public quantity: number = 1;
  public FlavorOrColor: any = '';
  public Size: any = '';
  public isOutOfStock: boolean = false;
  public isFavorites: boolean = false;
  public comment: string = '';
  public isLogin: boolean = false;
  public listComment: any[] = [];
  public countComment: number = 0;
  public editedComment: string = '';
  public product: any = {
    id: '',
    name: '',
    price: 0,
    quantity: 0,
    available: false,
    image1: '',
    image2: '',
    image3: '',
    accessory: false,
    status: false,
    weight: '',
    numberofuses: '',
    proteincomposition: '',
    aminoacids: '',
    servings: '',
    othercomposition: '',
    contents: '',
    createday: null,
    personcreate: '',
    deleteday: null,
    persondelete: '',
    updateday: null,
    personupdate: null,
    brand: {
      id: 'choose',
      name: 'Choose',
    },
  };
  public category: any[] = [
    {
      id: 0,
      product: {
        brand: {},
      },
      categoryDetail: {},
    },
  ];
  private isEMPTY: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  ngOnInit(): void {
    this.layoutComponent.loading(true);
    this.isLoggedAdmin$ = this.authService.isLoggedAdmin();
    this.isLoggedDire$ = this.authService.isLoggedDire();
    this.idproduct = String(this.getIdProduct());
    this.getDetail();
    this.isEMPTY.asObservable().subscribe((data) => {
      this.layoutComponent.loading(data);
    });
    this.authService.getLoggedUsername().subscribe((data) => {
      this.username = data;
      this.loadLike(data);
    });
    this.authService.isLoggedSuccess().subscribe((data) => {
      this.isLogin = data;
    });
    this.loadComment();
  }

  public getIdProduct() {
    let id: any;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = String(params.get('id'));
    });
    return id;
  }

  private checkQuantityProduct(product: any) {
    let quantity = product.quantity;
    if (quantity == 0) {
      this.isOutOfStock = true;
    }
  }

  public getDetail() {
    let cate = new BehaviorSubject<boolean>(false),
      flavor = new BehaviorSubject<boolean>(false),
      size = new BehaviorSubject<boolean>(false);

    this.categoryService
      .getCategoryByProduct(this.idproduct)
      .subscribe((resp) => {
        this.category = resp;
        if (this.category.length > 0) {
          this.product = this.category[0].product;
          this.checkQuantityProduct(this.product);
          cate.next(true);
        } else {
          this.productService
            .getProductDetail(this.idproduct)
            .subscribe((resp) => {
              this.product = resp;
              this.checkQuantityProduct(resp);
              cate.next(true);
            });
        }
      });

    this.flavorOrColorService
      .getFlavorOrColorByProduct(this.idproduct)
      .subscribe((resp) => {
        if (resp.length != 0) {
          this.listFlavorOrColor = resp;
          this.activeFlavorOrColor = true;
          if (this.category.length != 0) {
            if (!this.category[0].product.accessory) {
              this.activeFlavor = true;
            } else {
              this.activeFlavor = false;
            }
          }
        }
        flavor.next(true);
      });
    this.sizeService.getByProductId(this.idproduct).subscribe((resp) => {
      if (resp.length != 0) {
        this.listSize = resp;
        this.activeSize = true;
      }
      size.next(true);
    });
    cate.asObservable().subscribe((value1) => {
      flavor.asObservable().subscribe((value2) => {
        size.asObservable().subscribe((value3) => {
          if (value1 && value2 && value3) {
            this.isEMPTY.next(false);
          }
        });
      });
    });
  }

  public addToCart() {
    if (this.listFlavorOrColor.length != 0 && this.FlavorOrColor == '') {
      alert('Please choose the options of the product!');
    } else if (this.listSize.length != 0 && this.Size == '') {
      alert('Please choose the options of the product!');
    } else {
      this.shoppingCartService.checkProductInCart(
        this.idproduct,
        this.quantity,
        this.FlavorOrColor,
        this.Size
      );
    }
  }

  public loadLike(username: string) {
    if (username != '') {
      let like = {
        idproduct: this.idproduct,
        username: username,
      };
      this.likeService.getLike(like).subscribe((data) => {
        this.isFavorites = data.status;
      });
    }
  }

  public FavoritesItem() {
    let like = {
      idproduct: this.idproduct,
      username: this.username,
    };
    let checkUser = this.authService.isLoggedSuccess().subscribe((data) => {
      if (data) {
        setTimeout(() => {
          this.likeService.save(like).subscribe((data) => {
            console.log(data);
          });
        }, 100);
      } else {
        let inp = <HTMLInputElement>document.getElementById('favorite');
        inp.checked = false;
        setTimeout(() => {
          console.log(this.isFavorites);
        }, 100);
        alert('Please login to use!');
      }
    });
    checkUser.unsubscribe();
  }

  public changeFavorites() {
    this.isFavorites = false;
  }

  private loadComment() {
    this.commentService.getAllByProduct(this.idproduct).subscribe((data) => {
      this.listComment = data;
      if (this.listComment.length != 0) {
        this.countComment = this.listComment.length;
      } else {
        this.countComment = 0;
      }
    });
  }

  public submitComment() {
    if (this.comment != '') {
      let commentRequset = {
        username: this.username,
        idproduct: this.idproduct,
        comment: this.comment,
        commentday: new Date().toISOString(),
      };
      this.commentService.save(commentRequset).subscribe((data) => {
        if (data.status) {
          this.loadComment();
        } else {
          console.log(data);
        }
      });
    } else {
      alert('Please enter content in the comments section!');
    }
  }

  public deleteComment(id: number) {
    this.commentService.delete(id).subscribe((data) => {
      if (data.status) {
        this.loadComment();
      } else {
        alert(data.message);
      }
    });
  }

  public showComment(index: number) {
    let a = <HTMLElement>document.getElementById('hideshow' + index);
    let p = <HTMLElement>document.getElementById('comment-text-p' + index);
    if (a.innerHTML == 'Show') {
      a.innerHTML = 'Hide';
      p.style.cssText = `overflow: hidden;
          text-overflow: clip;
          -webkit-line-clamp: inherit;
          display: -webkit-box;
          -webkit-box-orient: vertical;`;
    } else {
      a.innerHTML = 'Show';
      p.style.cssText = `overflow: hidden;
      text-overflow: ellipsis;
      height: fit-content;
      -webkit-line-clamp: 3;
      display: -webkit-box;
      -webkit-box-orient: vertical;`;
    }
  }

  private sizeListComment: number = 5;
  public limitComment(index: number): boolean {
    if (index < this.sizeListComment) {
      return true;
    } else {
      return false;
    }
  }
  public hideloadcommet: boolean = true;
  public showMore() {
    this.sizeListComment = this.sizeListComment + 5;
    if (this.sizeListComment > this.listComment.length) {
      this.hideloadcommet = false;
    }
  }

  public hideComment() {
    this.sizeListComment = 5;
    this.hideloadcommet = true;
  }

  public showEditComment(comment: any) {
    this.editedComment = comment.comment;

    let element1 = <HTMLElement>(
      document.getElementById('edit' + comment.idcomment)
    );
    element1.hidden = true;

    let element2 = <HTMLElement>(
      document.getElementById('boxeditcomment' + comment.idcomment)
    );
    element2.hidden = false;
  }

  public cancelEditComment(idcomment: any) {
    let element1 = <HTMLElement>document.getElementById('edit' + idcomment);
    element1.hidden = false;

    let element2 = <HTMLElement>(
      document.getElementById('boxeditcomment' + idcomment)
    );
    element2.hidden = true;
  }
  public editComment(idcomment: number) {
    let commentRequset = {
      idcomment: idcomment,
      username: this.username,
      idproduct: this.idproduct,
      comment: this.editedComment,
      commentday: new Date().toISOString(),
    };

    this.commentService.update(commentRequset).subscribe((data) => {
      if (data.status) {
        this.cancelEditComment(idcomment);
        this.loadComment();
      } else {
        console.log(data);
      }
    });
  }
}
