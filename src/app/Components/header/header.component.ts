import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { updateCartCounter } from 'src/app/Store/cartQuantity/cartActions';
import { updateSearchValue } from 'src/app/Store/searchedValue/searchedValueActions';
import { updateWishlistCounter } from 'src/app/Store/wishlistQuantity/wishlistActions';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { WishlistService } from 'src/app/Services/Wishlist/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  searchValue:string = "";
  wishListQuantity$ = this.store.pipe(select((state: any) => state.wishlist.counter))
  cartQuantity$ = this.store.pipe(select((state: any) => state.cart.counter))
  isDropDownClicked:boolean = false;
  isUserLoggedIn$ = this.store.pipe(select((state: any) => state.userLogin.flag));

  constructor(private store: Store, private wishListService: WishlistService, private cartService: CartService, private router: Router){ }

  ngOnInit(): void {

    if(localStorage.getItem('token')){

      this.wishListService.getAllWishlist().subscribe(
        (res: any) => {
          this.store.dispatch(updateWishlistCounter({ newValue: res.count }));
        }
        ,
        (err: any) => {
          this.store.dispatch(updateCartCounter({ newValue: 0 }));
        })
  
      this.cartService.getAllCart().subscribe(
        (res: any) => {
          if (res.status == 'success')
            this.store.dispatch(updateCartCounter({ newValue: res.numOfCartItems }));
          else
            this.store.dispatch(updateCartCounter({ newValue: 0 }));
        }
        ,
        (err: any) => {
          this.store.dispatch(updateCartCounter({ newValue: 0 }));
        })
        
    }
  }


  changeDropDownValue():void{
    this.isDropDownClicked = !this.isDropDownClicked;
  }

  onLogout():void{
    localStorage.setItem('token','');
    window.location.reload();
  }

  onSearch():void{
    this.store.dispatch(updateSearchValue({ newValue: this.searchValue }));
    this.router.navigate(['/search']);
  }


}
