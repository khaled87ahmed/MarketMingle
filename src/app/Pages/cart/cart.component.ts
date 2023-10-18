import { Component } from '@angular/core';
import { CartService } from '../../Services/Cart/cart.service';
import { Store, select } from '@ngrx/store';
import { updateLoading } from 'src/app/Store/loading/loadingActions';
import { updateCartCounter } from 'src/app/Store/cartQuantity/cartActions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartQuantity$ = this.store.pipe(select((state: any) => state.cart.counter))
  products: any[] = [];
  result: any = {};
  isUserLoggedIn: boolean = localStorage.getItem('token') ? true : false;

  constructor(private store: Store, private cartService: CartService, private router: Router) {

    window.scrollTo(0, 0);

    if (!this.isUserLoggedIn)
      this.router.navigate(['/login']);

    else {
      this.store.dispatch(updateLoading({ newValue: true }));

      this.cartService.getAllCart().subscribe(
        (res: any) => {
          this.products = res.data.products;
          this.result = res;
          this.store.dispatch(updateLoading({ newValue: false }));
        }
        ,
        (err: any) => {
          this.products = [];
          this.result = {};
          this.store.dispatch(updateLoading({ newValue: false }));
        })
    }

  }


  incQuantity(id: string | null, count: number) {

    this.store.dispatch(updateLoading({ newValue: true }));

    this.cartService.updateCartItem(id, count + 1).subscribe((res: any) => {

      this.products = res.data.products;
      this.result = res;

      this.store.dispatch(updateCartCounter({ newValue: res.numOfCartItems }));

      this.store.dispatch(updateLoading({ newValue: false }));

    })

  }

  decQuantity(id: string | null, count: number) {

    this.store.dispatch(updateLoading({ newValue: true }));

    if (count > 1) {
      this.cartService.updateCartItem(id, count - 1).subscribe((res: any) => {
        this.products = res.data.products;
        this.result = res;
        this.store.dispatch(updateCartCounter({ newValue: res.numOfCartItems }));
        this.store.dispatch(updateLoading({ newValue: false }));
      })
    }

    else {
      this.removeProduct(id);
    }



  }

  removeProduct(id: string | null) {

    this.store.dispatch(updateLoading({ newValue: true }));

    this.cartService.deleteFromCart(id).subscribe((res: any) => {
      this.products = res.data.products;
      this.result = res;
      this.store.dispatch(updateCartCounter({ newValue: res.numOfCartItems }));
      this.store.dispatch(updateLoading({ newValue: false }));
    })

  }

  clearCart() {

    this.store.dispatch(updateLoading({ newValue: true }));

    this.cartService.clearCart().subscribe((res: any) => {
      this.products = [];
      this.result = {};
      this.store.dispatch(updateCartCounter({ newValue: 0 }));
      this.store.dispatch(updateLoading({ newValue: false }));
    })

  }

}
