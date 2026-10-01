import { TdeeComponent } from './componet_home/tool/tool-list/tdee/tdee.component';
import { PrtComponent } from './componet_home/tool/tool-list/prt/prt.component';
import { MrcComponent } from './componet_home/tool/tool-list/mrc/mrc.component';
import { FatComponent } from './componet_home/tool/tool-list/fat/fat.component';
import { CarbComponent } from './componet_home/tool/tool-list/carb/carb.component';
import { CaloComponent } from './componet_home/tool/tool-list/calo/calo.component';
import { BmrComponent } from './componet_home/tool/tool-list/bmr/bmr.component';
import { BmiComponent } from './componet_home/tool/tool-list/bmi/bmi.component';
import { MyCkEditorComponent } from './ck-editor/my-ck-editor/my-ck-editor.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData, DatePipe } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { CategoryComponent } from './componet_home/category/category.component';
import { EventComponent } from './componet_home/event/event.component';
import { BlogDetailsComponent } from './componet_home/blog-details/blog-details.component';
import { BlogGridComponent } from './componet_home/blog-grid/blog-grid.component';
import { CheckoutComponent } from './componet_home/checkout/checkout.component';
import { WishlistComponent } from './componet_home/wishlist/wishlist.component';
import { ShoppingCartComponent } from './componet_home/shopping-cart/shopping-cart.component';
import { ProductDetailsComponent } from './componet_home/product-details/product-details.component';
import { ShopComponent } from './componet_home/shop/shop.component';
import { OurProgramComponent } from './componet_home/our-program/our-program.component';
import { ContactComponent } from './componet_home/contact/contact.component';
import { TeamComponent } from './componet_home/team/team.component';
import { AboutComponent } from './componet_home/about/about.component';
import { LayoutComponent } from './componet_home/layout/layout.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './componet_home/signup/signup.component';
import { SigninComponent } from './componet_home/signin/signin.component';
import { ForgotPasswordComponent } from './componet_home/forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './component_admin/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './component_admin/admin-layout/admin-layout.component';
import { AdminFlavorOrColorComponent } from './component_admin/admin-flavor-or-color/admin-flavor-or-color.component';
import { AdminAccountComponent } from './component_admin/admin-account/admin-account.component';
import { AdminProductComponent } from './component_admin/admin-product/admin-product.component';
import { AdminBrandComponent } from './component_admin/admin-brand/admin-brand.component';
import { AdminCategoryComponent } from './component_admin/admin-category/admin-category.component';
import { AdminSizeComponent } from './component_admin/admin-size/admin-size.component';
import { AdminOrderComponent } from './component_admin/admin-order/admin-order.component';
import { AuthorityAndRoleComponent } from './component_admin/authority-and-role/authority-and-role.component';
import { AdminpageLoginComponent } from './component_admin/adminpage-login/adminpage-login.component';
import { UserProfileComponent } from './componet_home/user-profile/user-profile.component';
import { AdminBlogComponent } from './component_admin/admin-blog/admin-blog.component';
import { ToolComponent } from './componet_home/tool/tool.component';
import { BfComponent } from './componet_home/tool/tool-list/bf/bf.component';

registerLocaleData(localeVi, 'vi');
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AboutComponent,
    TeamComponent,
    ContactComponent,
    OurProgramComponent,
    ShopComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    WishlistComponent,
    CheckoutComponent,
    BlogGridComponent,
    BlogDetailsComponent,
    EventComponent,
    CategoryComponent,
    SignupComponent,
    SigninComponent,
    ForgotPasswordComponent,
    AdminDashboardComponent,
    AdminLayoutComponent,
    AdminFlavorOrColorComponent,
    AdminAccountComponent,
    AdminProductComponent,
    AdminBrandComponent,
    AdminCategoryComponent,
    AdminSizeComponent,
    AdminOrderComponent,
    AuthorityAndRoleComponent,
    AdminpageLoginComponent,
    UserProfileComponent,
    MyCkEditorComponent,
    AdminBlogComponent,
    ToolComponent,
    BfComponent,
    BmiComponent,
    BmrComponent,
    CaloComponent,
    CarbComponent,
    FatComponent,
    MrcComponent,
    PrtComponent,
    TdeeComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CKEditorModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'vi' },
    CookieService,
    DatePipe,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
