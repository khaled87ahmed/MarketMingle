import { Component } from '@angular/core';
import { CartService } from '../../Services/Cart/cart.service';
import { Store, select } from '@ngrx/store';
import { updateLoading } from 'src/app/Store/loading/loadingActions';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  products: any[] = [];
  result: any = {};
  billingLoading: boolean = false;
  cartId: string = '';
  errMsg: boolean = false;
  isUserLoggedIn: boolean = localStorage.getItem('token') ? true : false;


  constructor(private store: Store, private cartService: CartService, private authService: AuthenticationService, private router: Router) {
    window.scrollTo(0, 0);
    this.getData()
  }

  async getData() {

    try {
      this.store.dispatch(updateLoading({ newValue: true }));

      if (!this.isUserLoggedIn)
        this.router.navigate(['/login']);

      await Promise.all([this.getAllCart(), this.getLoggedUserAddress()]);

    }

    finally {
      this.store.dispatch(updateLoading({ newValue: false }));
    }

  }


  async getAllCart() {
    try {
      const res: any = await this.cartService.getAllCart().toPromise();
      this.products = res.data.products;
      this.result = res;
      this.cartId = res.data._id;
    }
    catch (err) {
      this.products = [];
      this.result = {};
    }
  }


  async getLoggedUserAddress() {
    try {
      const res: any = await this.authService.getLoggedUserAddress().toPromise();
      const n = res.results;

      this.billingSchema.reset({
        details: res.data[n - 1]?.details || '',
        city: res.data[n - 1]?.city || '',
        phone: res.data[n - 1]?.phone || ''
      });

    }
    catch (err) {
    }
  }


  billingSchema = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    details: new FormControl('', [Validators.required, Validators.minLength(3)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })


  onPlaceOrder() {

    this.billingLoading = true;

    const data = {
      "shippingAddress": {
        "details": this.billingSchema.value.details,
        "phone": this.billingSchema.value.phone,
        "city": this.billingSchema.value.city
      }
    }

    this.cartService.onCheckoutSession(this.cartId, data).subscribe(
      (res: any) => {
        this.billingLoading = false;
        this.errMsg = false;
        window.location.href = res.session.url
      }
      ,
      (err: any) => {
        this.billingLoading = false;
        this.errMsg = true;
      }
    )
  }

}
