import { Component } from '@angular/core';
import { ProductsService } from '../../Services/Products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from 'src/app/Services/Wishlist/wishlist.service';
import { updateWishlistCounter } from 'src/app/Store/wishlistQuantity/wishlistActions';
import { Store, select } from '@ngrx/store';
import { updateLoading } from 'src/app/Store/loading/loadingActions';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { updateCartCounter } from 'src/app/Store/cartQuantity/cartActions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  allProducts: any[] = [];
  products: any[] = [];
  wishlistProducts: any[] = [];
  wishlist: { [key: string]: boolean } = {};
  isUserLoggedIn$ = this.store.pipe(select((state: any) => state.userLogin.flag));
  searchedValueFromHeader$ = this.store.pipe(select((state: any) => state.searchValue.value));
  searchedValue: string = '';

  constructor(private productsService: ProductsService, private wishListService: WishlistService, private cartService: CartService, private router: Router, private store: Store, private route: ActivatedRoute) {
    window.scrollTo(0, 0);
    
    this.getData()

    this.searchedValueFromHeader$.subscribe((res) => {
      this.searchedValue = res;
      const filteredProducts = this.allProducts.filter(product => {
        const productTitle = product.title.toLowerCase();
        const filterString = this.searchedValue.toLowerCase();
        return productTitle.includes(filterString);
      });
      this.products = [...filteredProducts]
    })

  }


  async getData() {

    try {
      this.store.dispatch(updateLoading({ newValue: true }));

      let flag;
      this.isUserLoggedIn$.subscribe((res) => {
        flag = res;
      })

      if (flag)
        await Promise.all([this.getAllProducts(), this.getAllWishlist(), this.updateCartNumber()]);

      else
        await Promise.all([this.getAllProducts()]);

    }

    finally {
      this.store.dispatch(updateLoading({ newValue: false }));
    }

  }

  async getAllProducts() {

    try {
      const res: any = await this.productsService.getAllProducts().toPromise();
      this.allProducts = res.data;

      const filteredProducts = this.allProducts.filter(product => {
        const productTitle = product.title.toLowerCase();
        const filterString = this.searchedValue.toLowerCase();
        return productTitle.includes(filterString);
      });

      this.products = [...filteredProducts]
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
