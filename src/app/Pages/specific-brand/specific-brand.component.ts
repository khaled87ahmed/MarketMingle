import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { updateLoading } from 'src/app/Store/loading/loadingActions';
import { updateWishlistCounter } from 'src/app/Store/wishlistQuantity/wishlistActions';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { updateCartCounter } from 'src/app/Store/cartQuantity/cartActions';
import { WishlistService } from 'src/app/Services/Wishlist/wishlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/Services/Products/products.service';

@Component({
  selector: 'app-specific-brand',
  templateUrl: './specific-brand.component.html',
  styleUrls: ['./specific-brand.component.css']
})
export class SpecificBrandComponent {

  wishListQuantity$ = this.store.pipe(select((state: any) => state.wishlist.counter))
  products: any[] = [];
  wishlistProducts: any[] = [];
  wishlist: { [key: string]: boolean } = {};
  id: string | null = this.router.snapshot.paramMap.get('id');
  noData: boolean = true;

  constructor(private store: Store, private productService: ProductsService, private wishListService: WishlistService, private cartService: CartService, private navigate: Router, private router: ActivatedRoute,) {
    window.scrollTo(0, 0);
    this.getData();
  }

  async getData() {

    try {
      this.store.dispatch(updateLoading({ newValue: true }));

      if (localStorage.getItem('token'))
        await Promise.all([this.getProducts(), this.getAllWishlist(), this.updateCartNumber()]);

      else
        await Promise.all([this.getProducts()]);

    }

    finally {
      this.store.dispatch(updateLoading({ newValue: false }));
    }

  }

  async getProducts() {
    try {
      const res: any = await this.productService.getSpecificBrand(this.id).toPromise();

      if (res.results == 0) {
        this.noData = true;
        this.store.dispatch(updateLoading({ newValue: false }));
        return;
      }

      this.noData = false;
      this.products = res.data;
    }
    catch (err) {
    }
  }


  async getAllWishlist() {

    try {
      const res: any = await this.wishListService.getAllWishlist().toPromise();
      this.wishlistProducts = res.data;
      this.store.dispatch(updateWishlistCounter({ newValue: res.count }));

      this.wishlistProducts.map((e) => {
        this.wishlist[e.id] = true
      })
      
    }
    catch (err) {
    }

  }

  async updateCartNumber() {

    try {
      const res: any = await this.cartService.getAllCart().toPromise();
      this.store.dispatch(updateCartCounter({ newValue: res.numOfCartItems }));
    }
    catch (err) {
      this.store.dispatch(updateCartCounter({ newValue: 0 }));
    }

  }

}
