import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) { }

  getAllWishlist(){

    const token = localStorage.getItem('token');

    const headers = token ? new HttpHeaders({ 'token': token }): undefined;

    return this.http.get(environment.baseUrl + '/wishlist', { headers });
    
  }

  addWishlist(id:string|null){

    const token = localStorage.getItem('token');

    const headers = token ? new HttpHeaders({ 'token': token }): undefined;

    return this.http.post(environment.baseUrl + '/wishlist', {"productId": id} , { headers } );
    
  }

  deleteWishlist(id:string|null){

    const token = localStorage.getItem('token');

    const headers = token ? new HttpHeaders({ 'token': token }): undefined;

    return this.http.delete(environment.baseUrl + '/wishlist/' + id , { headers } );
    
  }

  
}
