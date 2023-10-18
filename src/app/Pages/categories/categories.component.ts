import { Component } from '@angular/core';
import { ProductsService } from '../../Services/Products/products.service';
import { updateLoading } from 'src/app/Store/loading/loadingActions';
import { Store, select } from '@ngrx/store';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  categories: any[] = [];

  constructor(private productsService: ProductsService, private store: Store){  
    window.scrollTo(0, 0);   
    this.getAllCategories();
  }

  getAllCategories() {
    
    this.store.dispatch(updateLoading({ newValue: true }));

    this.productsService.getAllCategories().subscribe(
      (res: any) => {

        this.categories = res.data;
        this.store.dispatch(updateLoading({ newValue: false }));
      }
      ,
      (err: any) => {
        this.store.dispatch(updateLoading({ newValue: false }));
      }
    )
  }

}
