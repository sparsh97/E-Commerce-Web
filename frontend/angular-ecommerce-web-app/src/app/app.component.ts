import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-ecommerce-web-app';
  isToken: boolean = false;

  ngOnInit() {
    this.isToken = sessionStorage.getItem("token") ? true: false;
  }

}
