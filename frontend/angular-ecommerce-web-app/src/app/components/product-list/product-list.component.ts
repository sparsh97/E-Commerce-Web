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
  searchMode: boolean = false;
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    })
   
  }

  listProduct() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProduct();
    }
  }

  handleSearchProducts() {
    const searchKeyword = this.route.snapshot.paramMap.get("keyword");
    this.productService.searchProducts(searchKeyword).subscribe(data => {
      this.product = data;
    })
  }

  handleListProduct() {
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
