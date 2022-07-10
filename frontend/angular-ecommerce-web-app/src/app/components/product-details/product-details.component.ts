import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartItemService } from 'src/app/services/cart-item.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartItemService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    const productId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(productId).subscribe(data => {
      this.product = data;
    })
  }

  addToCart(product: Product) {
    let cartItem: CartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);

  }

}
