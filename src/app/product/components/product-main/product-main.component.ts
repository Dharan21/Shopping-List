import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductApiService } from 'src/app/shared/services/product-api-call.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.services';

@Component({
  selector: 'app-product-main',
  templateUrl: 'product-main.component.html'
})
export class ProductMainComponent implements OnInit, OnDestroy {
  productsSub: Subscription;
  constructor(
    private api: ProductApiService,
    private spinner: NgxSpinnerService,
    private scService: ShoppingCartService
  ) { }

  ngOnInit() {
    if (this.scService.getProducts().length === 0) {
      this.spinner.show();
      this.productsSub = this.api.fetchProducts().subscribe(
        () => {
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
  }
}
