import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.services';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  index: number;
  editMode = false;
  productForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.shoppingCartService.updateProduct(
        this.index,
        this.productForm.value
      );
    } else {
      this.shoppingCartService.addProduct(this.productForm.value);
    }
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['/products']);
  }

  private initForm() {
    let name = '';
    let image = '';
    let cost: number;
    let quantity: number;
    if (this.editMode) {
      const product = this.shoppingCartService.getProductByIndex(this.index);
      name = product.name;
      image = product.image;
      cost = product.cost;
      quantity = product.quantity;
    }
    this.productForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      image: new FormControl(image, Validators.required),
      cost: new FormControl(cost, Validators.required),
      quantity: new FormControl(quantity, Validators.required),
    });
  }
}
