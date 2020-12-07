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

  constructor() { }

  ngOnInit(): void {}
}
