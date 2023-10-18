import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  loadingFlag$ = this.store.pipe(select((state:any)=>state.loading.flag))
  constructor(private store:Store) { }
  
}
