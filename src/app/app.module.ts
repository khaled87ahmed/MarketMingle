import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CarouselModule } from 'primeng/carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LayoutComponent } from './Layout/layout.component';
import { FirstThreeWordsPipe } from './Pipes/First Three Words/first-three-words.pipe';
import { HeaderComponent } from './Components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { loadingReducer } from './Store/loading/loadingReducer';
import { wishlistReducer } from './Store/wishlistQuantity/wishlistReducer';
import { cartReducer } from './Store/cartQuantity/cartReducer';
import { searchReducer } from './Store/searchedValue/searchedValueReducer';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { NotFoundPageComponent } from './Pages/not-found-page/not-found-page.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { isUserLoggedInReducer } from './Store/isUserLoggedIn/isUserLoggedInReducer';
import { ProfileComponent } from './Pages/profile/profile.component';
import { SearchComponent } from './Pages/search/search.component';
import { CardComponent } from './Components/card/card.component';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';
import { CategoriesComponent } from './Pages/categories/categories.component';
import { SpecificCategoryComponent } from './Pages/specific-category/specific-category.component';
import { BrandsComponent } from './Pages/brands/brands.component';
import { SpecificBrandComponent } from './Pages/specific-brand/specific-brand.component';
import { CartComponent } from './Pages/cart/cart.component';
import { WishlistComponent } from './Pages/wishlist/wishlist.component';
import { CheckoutComponent } from './Pages/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstThreeWordsPipe,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NotFoundPageComponent,
    SpinnerComponent,
    ResetPasswordComponent,
    ProfileComponent,
    SearchComponent,
    CardComponent,
    ProductDetailsComponent,
    CategoriesComponent,
    SpecificCategoryComponent,
    BrandsComponent,
    SpecificBrandComponent,
    CartComponent,
    WishlistComponent,
    CheckoutComponent,
    
  ],
  imports: [
    StoreModule.forRoot({ loading: loadingReducer, userLogin: isUserLoggedInReducer, wishlist: wishlistReducer, cart:cartReducer, searchValue:searchReducer}),
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
