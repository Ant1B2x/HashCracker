import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';

import { routes } from '../app-routing.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  routes: Route[] = [];

  constructor() {
    this.routes = routes.filter(v => v.component)
  }

  ngOnInit(): void {
  }

}
