import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  userEmail!: string;
  orderhistory: OrderHistory[]=[];
  constructor(
    private orderHistory: OrderHistoryService
  ) { }

  ngOnInit(): void {
    this.userEmail = JSON.parse(sessionStorage.getItem('userEmail')!);
    this.getUserOrderhistory();
  }

  getUserOrderhistory() {

    this.orderHistory.getOrderHistory(this.userEmail).subscribe(res => {
      this.orderhistory = res._embedded.orders;
    })
  }

}
