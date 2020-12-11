import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: 'product-item.component.html'
})
export class ProductItemComponent {
  @Input() product: Product;
  @Input() index: number;

  constructor(private shoppingCartService: ShoppingCartService) { }

  onClick() {
    this.shoppingCartService.addToCart(this.product);
  }
}
