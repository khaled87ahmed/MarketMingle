import { Component } from '@angular/core';
import { ProductsService } from '../../Services/Products/products.service';
import { Store, select } from '@ngrx/store';
import { updateLoading } from 'src/app/Store/loading/loadingActions';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {

  brands: any[] = [];

  constructor(private productsService: ProductsService, private store: Store){ 
    window.scrollTo(0, 0);
    this.getAllBrands();
  }

  getAllBrands() {
    this.store.dispatch(updateLoading({ newValue: true }));
    this.productsService.getAllBrands().subscribe(
      (res: any) => {

        this.brands = res.data;
        this.store.dispatch(updateLoading({ newValue: false }));
      }
      ,
      (err: any) => {
        this.store.dispatch(updateLoading({ newValue: false }));
      }
    )
  }

}
