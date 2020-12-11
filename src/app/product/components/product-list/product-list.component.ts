import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.products = this.shoppingCartService.getProducts();
    this.shoppingCartService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }
}
