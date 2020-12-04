import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductApiService } from '../../services/product-api-call.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  apiSub: Subscription;

  constructor() { }

  ngOnInit(): void {}
}
