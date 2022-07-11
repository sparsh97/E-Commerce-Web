import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartItemService } from 'src/app/services/cart-item.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    private cartItemService: CartItemService
  ) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartItemService.cartItems;

    this.cartItemService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    })

    this.cartItemService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    })

    this.cartItemService.computeCartTotals();
  }

  clickToIncrementQuantity(cartItem: CartItem) {
    this.cartItemService.addToCart(cartItem);
  }

  clickToDecrementQuantity(cartItem: CartItem) {
    this.cartItemService.decrementQuantity(cartItem);   
  }

  remove(cartItem: CartItem) {
    this.cartItemService.remove(cartItem)
  }
 
}
