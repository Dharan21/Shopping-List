import { ProductApiService } from 'src/app/shared/services/product-api-call.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import * as fromConstants from './../../utils/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  apiSub: Subscription;
  navMenu = fromConstants.NavMenu;
  isLoggedIn = false;
  dummyData: any[] = [];

  constructor(private apiService: ProductApiService) { }

  ngOnInit(): void {
    this.apiService.asyncMethodForUnitTesting().then((data) => this.isLoggedIn = data);
  }

  getDummyData(): void {
    this.apiService.getDummyData().then((data) => {
      this.dummyData = data;
    });
  }
}
