import { Component } from '@angular/core';
import { ProductsService } from '../../Services/Products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { updateLoading } from 'src/app/Store/loading/loadingActions';
import { WishlistService } from 'src/app/Services/Wishlist/wishlist.service';
import { updateWishlistCounter } from 'src/app/Store/wishlistQuantity/wishlistActions';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { updateCartCounter } from 'src/app/Store/cartQuantity/cartActions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  id: string | null = this.router.snapshot.paramMap.get('id');
  item: any = {}
  itemQuantity: number = 1;
  wishlistProducts: any[] = [];
  isWishList: boolean = false;
  isUserLoggedIn$ = this.store.pipe(select((state: any) => state.userLogin.flag));

  constructor(private productService: ProductsService, private router: ActivatedRoute, private store: Store, private wishListService: WishlistService, private cartService: CartService, private navigate: Router) {
    window.scrollTo(0, 0);
    this.getData()
  }

  async getData() {

    try {
      this.store.dispatch(updateLoading({ newValue: true }));

      let flag;
      this.isUserLoggedIn$.subscribe((res) => {
        flag = res;
      })

      if (flag)
        await Promise.all([this.getSpecificProduct(), this.getAllWishlist()]);

      else
        await Promise.all([this.getSpecificProduct()]);

    }

    finally {
      this.store.dispatch(updateLoading({ newValue: false }));
    }

  }

  async getSpecificProduct() {
    try {
      const res: any = await this.productService.getSpecificProduct(this.id).toPromise();
      this.item = res.data;
    }
    catch (err) {
      console.log(err);
    }
  }

  async getAllWishlist() {
    try {
      const res: any = await this.wishListService.getAllWishlist().toPromise();

      this.wishlistProducts = res.data;
      this.wishlistProducts.map((e) => {
        if (this.id == e.id)
          this.isWishList = true;
      })

    }
    catch (err) {
      console.log(err);
    }
  }


  handelNumberOfStars(index: number, stars: number): boolean {
    index++;
    if (index < stars)
      return true
    else
      return false
  }

  onAddToCart() {

    let flag;
    this.isUserLoggedIn$.subscribe((res) => {
      flag = res;
    })

    if (!flag)
      this.navigate.navigate(['/login']);

    else {

      this.store.dispatch(updateLoading({ newValue: true }));

      this.cartService.addToCart(this.id).subscribe((resAdd: any) => {

        this.cartService.updateCartItem(this.id, this.itemQuantity).subscribe((resUpdate: any) => {

          this.store.dispatch(updateCartCounter({ newValue: resUpdate.numOfCartItems }));

          this.store.dispatch(updateLoading({ newValue: false }));
        })


      })

    }


  }

  handleWishlist() {

    let flag;
    this.isUserLoggedIn$.subscribe((res) => {
      flag = res;
    })

    if (!flag)
      this.navigate.navigate(['/login']);

    else {

      this.store.dispatch(updateLoading({ newValue: true }));

      if (this.isWishList) {

        this.isWishList = false;

        this.wishListService.deleteWishlist(this.id).subscribe((res: any) => {

          this.store.dispatch(updateWishlistCounter({ newValue: res.data.length }));

          this.store.dispatch(updateLoading({ newValue: false }));
        })



      }

      else {

        this.isWishList = true;

        this.wishListService.addWishlist(this.id).subscribe((res: any) => {

          this.store.dispatch(updateWishlistCounter({ newValue: res.data.length }));

          this.store.dispatch(updateLoading({ newValue: false }));
        })




      }

    }



  }

  incQuantity() {
    this.itemQuantity++;
  }

  decQuantity() {
    if (this.itemQuantity > 1)
      this.itemQuantity--;
  }

}
