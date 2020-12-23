import { NgModule } from '@angular/core';
import { CartComponent } from './components/cart/cart.component';
import { CartMainComponent } from './components/cart-main/cart-main.component';
import { CartInvoiceComponent } from './components/cart-invoice/cart-invoice.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '', component: CartMainComponent
  }
];

@NgModule({
  declarations: [
    CartComponent,
    CartMainComponent,
    CartInvoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CartModule { }
