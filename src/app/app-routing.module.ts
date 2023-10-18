import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { NotFoundPageComponent } from './Pages/not-found-page/not-found-page.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { SearchComponent } from './Pages/search/search.component';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';
import { CategoriesComponent } from './Pages/categories/categories.component';
import { SpecificCategoryComponent } from './Pages/specific-category/specific-category.component';
import { BrandsComponent } from './Pages/brands/brands.component';
import { SpecificBrandComponent } from './Pages/specific-brand/specific-brand.component';
import { CartComponent } from './Pages/cart/cart.component';
import { WishlistComponent } from './Pages/wishlist/wishlist.component';
import { CheckoutComponent } from './Pages/checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'allorders', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: SpecificCategoryComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'brands/:id', component: SpecificBrandComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
