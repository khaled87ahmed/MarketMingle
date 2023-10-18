import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from 'src/app/Services/Wishlist/wishlist.service';
import { updateWishlistCounter } from 'src/app/Store/wishlistQuantity/wishlistActions';
import { Store, select } from '@ngrx/store';
import { updateLoading } from 'src/app/Store/loading/loadingActions';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { updateCartCounter } from 'src/app/Store/cartQuantity/cartActions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() item: any ={};
  @Input() wishlist: any ={};
  @Output() dataEvent = new EventEmitter<string>();

  isUserLoggedIn$ = this.store.pipe(select((state: any) => state.userLogin.flag));
  
  constructor(private wishListService: WishlistService, private cartService: CartService, private router: Router, private store: Store) {
    
  }

  handelNumberOfStars(index: number, stars: number): boolean {
    index++;
    if (index < stars)
      return true
    else
      return false
  }

  toggleWishlist(itemId: string) {

    let flag;
    this.isUserLoggedIn$.subscribe((res) => {
      flag = res;
    })

    if (!flag)
      this.router.navigate(['/login']);

    else {
      this.store.dispatch(updateLoading({ newValue: true }));

      if (this.wishlist[itemId]) {

        this.wishlist[itemId] = false;

        this.wishListService.deleteWishlist(itemId).subscribe((res: any) => {

          this.store.dispatch(updateWishlistCounter({ newValue: res.data.length }));

          this.dataEvent.emit(itemId);

          this.store.dispatch(updateLoading({ newValue: false }));
        })

      }

      else {

        this.wishlist[itemId] = true;

        this.wishListService.addWishlist(itemId).subscribe((res: any) => {

          this.store.dispatch(updateWishlistCounter({ newValue: res.data.length }));

          this.store.dispatch(updateLoading({ newValue: false }));
        })
        
      }

    }
  }

  onAddToCart(itemId: string) {

    let flag;
    this.isUserLoggedIn$.subscribe((res) => {
      flag = res;
    })

    if (!flag)
      this.router.navigate(['/login']);

    else {
      this.store.dispatch(updateLoading({ newValue: true }));

      this.cartService.addToCart(itemId).subscribe((res: any) => {

        this.store.dispatch(updateCartCounter({ newValue: res.numOfCartItems }));

        this.store.dispatch(updateLoading({ newValue: false }));
      })

    }
  }

}
