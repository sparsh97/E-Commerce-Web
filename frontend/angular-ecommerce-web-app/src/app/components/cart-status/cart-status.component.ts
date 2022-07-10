import { Component, OnInit } from '@angular/core';
import { CartItemService } from 'src/app/services/cart-item.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(
    private cartService: CartItemService
  ) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {

    this.cartService.totalPrice.subscribe(data=>{
      this.totalPrice = data;
    })

    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    })
  }
}
