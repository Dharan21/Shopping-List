import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  productsChanged = new EventEmitter<Product[]>();
  cartItemsChanged = new EventEmitter<Product[]>();
  private newId = 5;
  cartItems: Product[] = [];
  products: Product[] = [];
  // products: Product[] = [
  //   new Product(
  //     'Lamborghini',
  //     'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     10,
  //     10,
  //   ),
  //   new Product(
  //     'Ferrari',
  //     'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     30,
  //     5,
  //   ),
  //   new Product(
  //     'Porsche',
  //     'https://images.pexels.com/photos/2127740/pexels-photo-2127740.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     50,
  //     1,
  //   ),
  //   new Product(
  //     'Kawasaki',
  //     'https://images.pexels.com/photos/595808/pexels-photo-595808.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     60,
  //     15,
  //   ),
  // ];

  getProducts() {
    return this.products.slice();
  }

  storeProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.emit(this.products.slice());
  }

  getProductByIndex(index: number): Product {
    return this.products[index];
  }

  getProductByName(products: Product[], name: string) {
    for (const product of products) {
      if (name === product.name) {
        return product;
      }
    }
    return null;
  }

  getProductById(products: Product[], id: number) {
    for (const product of products) {
      if (id === product.id) {
        return product;
      }
    }
    return null;
  }

  getCartItems() {
    return this.cartItems.slice();
  }

  addToCart(product: Product) {
    let productItem = this.getProductById(this.cartItems, product.id);
    if (productItem != null) {
      productItem.quantity += 1;
    } else {
      productItem = new Product(
        product.name,
        product.image,
        product.cost,
        1,
        product.id
      );
      this.cartItems.push(productItem);
    }
    this.cartItemsChanged.emit(this.cartItems.slice());
    const index = this.products.indexOf(product);
    this.products[index].quantity = product.quantity - 1;
    this.productsChanged.emit(this.products.slice());
  }

  addProduct(product: Product) {
    product.id = this.newId;
    this.newId++;
    this.products.push(product);
    this.productsChanged.emit(this.products);
  }

  updateProduct(index: number, product: Product) {
    const id = this.products[index].id;
    product.id = id;
    this.products[index] = product;
    this.productsChanged.emit(this.products.slice());
  }

  removeSingleQuantityFromCart(product: Product) {
    const productItem: Product = this.getProductByName(
      this.products,
      product.name
    );
    productItem.quantity += 1;
    this.productsChanged.emit(this.products.slice());

    const productItemInCart = this.getProductByName(
      this.cartItems,
      product.name
    );
    productItemInCart.quantity -= 1;
    if (productItemInCart.quantity === 0) {
      const index = this.cartItems.indexOf(product);
      this.cartItems.splice(index, 1);
    }
    this.cartItemsChanged.emit(this.cartItems.slice());
  }

  removeFromCart(product: Product) {
    const productItem: Product = this.getProductByName(
      this.products,
      product.name
    );
    productItem.quantity += product.quantity;
    this.productsChanged.emit(this.products.slice());

    const index = this.cartItems.indexOf(product);
    this.cartItems.splice(index, 1);
    this.cartItemsChanged.emit(this.cartItems.slice());
  }
}
