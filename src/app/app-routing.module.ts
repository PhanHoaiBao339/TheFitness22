import { AdminBlogComponent } from './component_admin/admin-blog/admin-blog.component';
import { CaloComponent } from './componet_home/tool/tool-list/calo/calo.component';
import { FatComponent } from './componet_home/tool/tool-list/fat/fat.component';
import { CarbComponent } from './componet_home/tool/tool-list/carb/carb.component';
import { PrtComponent } from './componet_home/tool/tool-list/prt/prt.component';
import { MrcComponent } from './componet_home/tool/tool-list/mrc/mrc.component';
import { BfComponent } from './componet_home/tool/tool-list/bf/bf.component';
import { TdeeComponent } from './componet_home/tool/tool-list/tdee/tdee.component';
import { BmrComponent } from './componet_home/tool/tool-list/bmr/bmr.component';
import { BmiComponent } from './componet_home/tool/tool-list/bmi/bmi.component';

import { ToolComponent } from './componet_home/tool/tool.component';
import { UserProfileComponent } from './componet_home/user-profile/user-profile.component';
import { AdminpageLoginComponent } from './component_admin/adminpage-login/adminpage-login.component';
import { ForgotPasswordComponent } from './componet_home/forgot-password/forgot-password.component';
import { AuthorityAndRoleComponent } from './component_admin/authority-and-role/authority-and-role.component';
import { AdminOrderComponent } from './component_admin/admin-order/admin-order.component';
import { AdminSizeComponent } from './component_admin/admin-size/admin-size.component';
import { AdminFlavorOrColorComponent } from './component_admin/admin-flavor-or-color/admin-flavor-or-color.component';
import { AdminCategoryComponent } from './component_admin/admin-category/admin-category.component';
import { AdminBrandComponent } from './component_admin/admin-brand/admin-brand.component';
import { AdminProductComponent } from './component_admin/admin-product/admin-product.component';
import { AdminAccountComponent } from './component_admin/admin-account/admin-account.component';
import { AuthGuard } from './auth.guard';
import { AdminLayoutComponent } from './component_admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './component_admin/admin-dashboard/admin-dashboard.component';
import { SigninComponent } from './componet_home/signin/signin.component';
import { SignupComponent } from './componet_home/signup/signup.component';
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
import { HomeComponent } from './componet_home/home/home.component';
import { LayoutComponent } from './componet_home/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'about', component: AboutComponent, title: 'About Us' },
      { path: 'team', component: TeamComponent, title: 'Team' },
      { path: 'contact', component: ContactComponent, title: 'Contact' },
      { path: 'event', component: EventComponent, title: 'Event' },
      {
        path: 'our-program',
        component: OurProgramComponent,
        title: 'Our Program',
      },
      { path: 'wishlist', component: WishlistComponent, title: 'Wish List' },

      // PRODUCT - SHOP - CHECKOUT
      { path: 'category', component: CategoryComponent, title: 'Category' },
      { path: 'shop/:type', component: ShopComponent },
      { path: 'category/:id', component: ShopComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
        title: 'Shopping Cart',
      },

      { path: 'checkout', component: CheckoutComponent, title: 'Check Out' },

      // ACCOUNT - SERCURITY - PROFILE
      { path: 'login', component: SigninComponent, title: 'Login' },
      {
        path: 'signup',
        component: SignupComponent,
        title: 'Register a new account',
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: 'Forgot Password',
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        title: 'User Profile',
      },

      // BLOG PAGE
      {
        path: 'blog-grid/:topic',
        component: BlogGridComponent,
        title: 'Blog',
      },
      {
        path: 'blog-details/:id',
        component: BlogDetailsComponent,
        title: 'Blog Details',
      },

      // TOOL PAGE
      { path: 'tools', component: ToolComponent, title: 'Tools' },

      { path: 'tools/bmi', component: BmiComponent, title: 'Calculate BMI' },
      { path: 'tools/bmr', component: BmrComponent, title: 'Calculate BMR' },
      { path: 'tools/tdee', component: TdeeComponent, title: 'Calculate TDEE' },
      { path: 'tools/bdf', component: BfComponent, title: 'Calculate Body Fat' },
      { path: 'tools/mrc', component: MrcComponent, title: 'Calculate Marco' },
      { path: 'tools/prt', component: PrtComponent, title: 'Calculate Protein' },
      { path: 'tools/carb', component: CarbComponent, title: 'Calculate Carb' },
      { path: 'tools/ft', component: FatComponent, title: 'Calculate Fat' },
      { path: 'tools/calo', component: CaloComponent, title: 'Calculate Calo' },
    ],
  },
  { path: 'admin', redirectTo: '/admin/login', pathMatch: 'full' },
  // { path: 'admin', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    title: 'Admin page',
    children: [
      {
        path: 'login',
        component: AdminpageLoginComponent,
        title: 'Login Admin Page',
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        title: 'Dashboard',
        canActivate: [AuthGuard],
      },
      {
        path: 'authority',
        component: AuthorityAndRoleComponent,
        title: 'Authority And Role',
        canActivate: [AuthGuard],
      },
      {
        path: 'account',
        component: AdminAccountComponent,
        title: 'Account Manager',
        canActivate: [AuthGuard],
      },
      {
        path: 'product',
        component: AdminProductComponent,
        title: 'Product Manager',
        canActivate: [AuthGuard],
      },
      {
        path: 'brand',
        component: AdminBrandComponent,
        title: 'Brand Manager',
        canActivate: [AuthGuard],
      },
      {
        path: 'category',
        component: AdminCategoryComponent,
        title: 'Category Manager',
        canActivate: [AuthGuard],
      },
      {
        path: 'flavororcolor',
        component: AdminFlavorOrColorComponent,
        title: 'Flavor Or Color Manager',
        canActivate: [AuthGuard],
      },
      {
        path: 'size',
        component: AdminSizeComponent,
        title: 'Size Manager',
        canActivate: [AuthGuard],
      },
      {
        path: 'order',
        component: AdminOrderComponent,
        title: 'Order Manager',
        canActivate: [AuthGuard],
      },
      {
        path: 'blogs',
        component: AdminBlogComponent,
        title: 'Blogs Manager',
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
