import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
})
export class CartComponent implements OnInit {
  products: Product[] = [];

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.products = this.shoppingCartService.getCartItems();
    this.shoppingCartService.cartItemsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
    this.shoppingCartService.productsChanged.subscribe(
      (products: Product[]) => {
        products.map((product) => {
          this.products.map((cartItem) => {
            if (cartItem.id === product.id) {
              if (cartItem.name !== product.name) {
                cartItem.name = product.name;
              }
              if (cartItem.cost !== product.cost) {
                cartItem.cost = product.cost;
              }
              if (cartItem.image !== product.image) {
                cartItem.image = product.image;
              }
            }
          });
        });
      }
    );
  }

  onRemoveSingleQuantity(product: Product) {
    this.shoppingCartService.removeSingleQuantityFromCart(product);
  }

  onRemoveFromCart(product: Product) {
    this.shoppingCartService.removeFromCart(product);
  }
}
