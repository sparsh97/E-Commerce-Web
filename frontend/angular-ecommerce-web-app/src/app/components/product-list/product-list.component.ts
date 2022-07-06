import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/commom/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  product!: Product[];
  currentCategoryId: number = 1;
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    })
   
  }

  listProduct() {
    const categorId:boolean = this.route.snapshot.paramMap.has("id");
    if(categorId) {
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get("id"));
    } else {
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(data => {
      this.product = data;
    })
  }

}
