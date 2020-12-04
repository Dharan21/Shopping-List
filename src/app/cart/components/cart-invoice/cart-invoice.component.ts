import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.services';

@Component({
  selector: 'app-cart-invoice',
  templateUrl: 'cart-invoice.component.html'
})
export class CartInvoiceComponent implements OnInit {
  products: Product[];
  subTotal = 0;
  discount = 0;
  vat = 0;
  total = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.products = this.shoppingCartService.getCartItems();
    this.calculateInvoiceDetails();
    this.shoppingCartService.cartItemsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
        this.calculateInvoiceDetails();
      }
    );
  }

  calculateInvoiceDetails() {
    this.subTotal = 0;
    this.products.forEach(product => {
      this.subTotal += product.cost * product.quantity;
    });
    this.discount = this.subTotal * 0.2;
    this.vat = this.subTotal * 0.1;
    this.total = this.subTotal - this.discount + this.vat;
  }
}
