import { AuthServiceForUnitTesting } from './auth-service-for-unit-testing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-start',
  templateUrl: './product-start.component.html',
  styleUrls: ['./product-start.component.css']
})
export class ProductStartComponent implements OnInit {

  constructor(private authTestService: AuthServiceForUnitTesting) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    return this.authTestService.isAuthenticated();
  }

}
