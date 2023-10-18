import { Component } from '@angular/core';
import { ProductsService } from '../../Services/Products/products.service';
import { Router } from '@angular/router';
import { WishlistService } from '../../Services/Wishlist/wishlist.service';
import { updateWishlistCounter } from 'src/app/Store/wishlistQuantity/wishlistActions';
import { updateLoading } from 'src/app/Store/loading/loadingActions';
import { Store, select } from '@ngrx/store';
import { CartService } from '../../Services/Cart/cart.service';
import { updateCartCounter } from 'src/app/Store/cartQuantity/cartActions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  responsiveOptions: any = [];
  categories: any[] = [];
  brands: any[] = [];
  products: any[] = [];
  wishlistProducts: any[] = [];
  wishlist: { [key: string]: boolean } = {};


  constructor(private productsService: ProductsService, private wishListService: WishlistService, private cartService: CartService, private router: Router, private store: Store) {
    window.scrollTo(0, 0);
    this.responsiveOptions = [
      {
        breakpoint: '5000px',
        numVisible: 6,
        numScroll: 1
      },

      {
        breakpoint: '1200px',
        numVisible: 5,
        numScroll: 1
      },

      {
        breakpoint: '992px',
        numVisible: 3,
        numScroll: 1
      },

      {
        breakpoint: '770px',
        numVisible: 2,
        numScroll: 1
      },

      {
        breakpoint: '490px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.store.dispatch(updateLoading({ newValue: true }));
    this.getAllData();
  }

  async getAllData() {

    try {
      this.store.dispatch(updateLoading({ newValue: true }));
      await Promise.all([ this.updateCartCounter(), this.getAllCategories(), this.getAllBrands(), this.getAllProducts(), this.getWishlistProducts()]);
    } finally {
      this.store.dispatch(updateLoading({ newValue: false }));
    }

  }

  async getAllCategories() {
    try {
      const res: any = await this.productsService.getAllCategories().toPromise();
      this.categories = res.data;
    }
    catch (err) {
      console.log(err);
    }
  }

  async getAllBrands() {
    try {
      const res: any = await this.productsService.getAllBrands().toPromise();
      this.brands = res.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllProducts() {
    try {
      const res: any = await this.productsService.getAllProducts().toPromise();
      this.products = res.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getWishlistProducts() {
    if (localStorage.getItem('token') ) {
      
      try {
        const res: any = await this.wishListService.getAllWishlist().toPromise();
        this.store.dispatch(updateWishlistCounter({ newValue: res.count }));
        this.wishlistProducts = res.data;
        this.wishlistProducts.map((e) => {
          this.wishlist[e.id] = true
        })
      } catch (err) {
        this.store.dispatch(updateCartCounter({ newValue: 0 }));
        console.log(err);
      }
    }
  }

  async updateCartCounter() {

    if (localStorage.getItem('token') ) {

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

  

  handelNumberOfStars(index: number, stars: number): boolean {
    index++;
    if (index < stars)
      return true
    else
      return false
  }

  toggleWishlist(itemId: string) {

    if ((!localStorage.getItem('token') )) {
      this.router.navigate(['/login']);
      return;
    }

    this.store.dispatch(updateLoading({ newValue: true }));

    if (this.wishlist[itemId]) {
      this.wishlist[itemId] = false;
      this.wishListService.deleteWishlist(itemId).subscribe((res: any) => {
        this.store.dispatch(updateWishlistCounter({ newValue: res.data.length }));
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

  onAddToCart(itemId: string) {

    if ((!localStorage.getItem('token') )) {
      this.router.navigate(['/login']);
      return;
    }


    this.store.dispatch(updateLoading({ newValue: true }));
    this.cartService.addToCart(itemId).subscribe((res: any) => {
      this.store.dispatch(updateCartCounter({ newValue: res.numOfCartItems }));
      this.store.dispatch(updateLoading({ newValue: false }));
    })
  }

}
