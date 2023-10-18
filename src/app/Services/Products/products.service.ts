import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }


  

  getAllProducts(){
    return this.http.get( environment.baseUrl + '/products' )
  }

  getSpecificProduct(id:string|null){
    return this.http.get( environment.baseUrl + '/products/' + id )
  }

  getAllCategories(){
    return this.http.get( environment.baseUrl + '/categories' )
  }

  getSpecificCategory(id:string|null){
    return this.http.get( environment.baseUrl + '/products/?category[in][]=' + id )
  }

  getAllBrands(){
    return this.http.get( environment.baseUrl + '/brands' )
  }

  getSpecificBrand(id:string|null){
    return this.http.get( environment.baseUrl + '/products/?brand=' + id )
  }


  
}
