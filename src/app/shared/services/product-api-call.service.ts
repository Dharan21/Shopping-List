import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { ShoppingCartService } from './shopping-cart.service';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductApiService {

  constructor(
    private http: HttpClient,
    private scService: ShoppingCartService
  ) { }

  fetchProducts() {
    return this.http
      .get<Product[]>('https://shopping-cart-f21f6.firebaseio.com/products.json')
      .pipe(
        tap(products => {
          this.scService.storeProducts(products);
        })
      );
  }

  asyncMethodForUnitTesting(): Promise<boolean> {
    return new Promise((resolve, reject) => { setTimeout(() => { resolve(true) }, 1500)})
  }

  getDummyData(): Promise<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts').toPromise();
  }
}
