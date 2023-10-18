import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  getAllCart(){

    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders({ 'token': token })
      : undefined;

    return this.http.get(environment.baseUrl + '/cart', { headers });
    
  }

  addToCart(id:string|null){

    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders({ 'token': token })
      : undefined;

    return this.http.post(environment.baseUrl + '/cart', {"productId": id} , { headers } );
    
  }

  updateCartItem(id:string|null , count:number){

    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders({ 'token': token })
      : undefined;

    return this.http.put(environment.baseUrl + '/cart/' + id, {"count": count} , { headers } );
    
  }

  deleteFromCart(id:string|null){

    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders({ 'token': token })
      : undefined;

    return this.http.delete(environment.baseUrl + '/cart/' + id , { headers } );
    
  }

  clearCart(){

    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders({ 'token': token })
      : undefined;

    return this.http.delete(environment.baseUrl + '/cart' , { headers } );

  }

  onCheckoutSession(id:any,data:any){


    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders({ 'token': token })
      : undefined;


      return this.http.post(environment.baseUrl +'/orders/checkout-session/'+ id+'?url=http://localhost:4200' , data , { headers } )
        

  }


}
