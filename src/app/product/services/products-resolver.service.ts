import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Product } from 'src/app/shared/models/product.model';
import { ProductApiService } from 'src/app/shared/services/product-api-call.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Injectable({ providedIn: 'root' })
export class ProductsResolver implements Resolve<Product[]> {

  constructor(
    private api: ProductApiService,
    private scService: ShoppingCartService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const products = this.scService.getProducts();
    if (products.length === 0) {
      return this.api.fetchProducts();
    } else {
      return products;
    }

  }
}
