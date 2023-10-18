import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { WishlistService } from '../../Services/Wishlist/wishlist.service';
import { updateLoading } from 'src/app/Store/loading/loadingActions';
import { updateWishlistCounter } from 'src/app/Store/wishlistQuantity/wishlistActions';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { updateCartCounter } from 'src/app/Store/cartQuantity/cartActions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  wishListQuantity$ = this.store.pipe(select((state: any) => state.wishlist.counter))
  products: any[] = [];
  isUserLoggedIn: boolean = localStorage.getItem('token') ? true : false;
  wishlist: { [key: string]: boolean } = {};

  constructor(private store: Store, private wishListService: WishlistService, private cartService: CartService, private router: Router) {

    window.scrollTo(0, 0);

    if (!this.isUserLoggedIn)
      this.router.navigate(['/login']);

    else {
      this.store.dispatch(updateLoading({ newValue: true }));
      this.wishListService.getAllWishlist().subscribe((res: any) => {
        this.products = res.data;
        this.products.map((e) => {
          this.wishlist[e.id] = true
        })
        this.store.dispatch(updateLoading({ newValue: false }));
      })
    }

  }


  onRemoveWishlist(itemId: string) {
    let temp = [...this.products]
    this.products = [];
    temp.filter((el: any, i: number) => {
      if (itemId != el.id)
        this.products.push(temp[i]);
    })
  }





}
