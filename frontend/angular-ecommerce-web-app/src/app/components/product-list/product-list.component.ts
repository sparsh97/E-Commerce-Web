import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartItemService } from 'src/app/services/cart-item.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  product!: Product[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  //pagination
  thePageNumber: number = 1;
  thePageSiz: number = 5;
  totalElements: number = 0;
  previousKeyWord!: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartItemService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    });
  }

  listProduct() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProduct();
    }
  }

  handleSearchProducts() {
    const searchKeyword: any = this.route.snapshot.paramMap.get('keyword');
    if(this.previousKeyWord != searchKeyword) {
      this.thePageNumber = 1;
    }
    this.previousKeyWord = searchKeyword;

    // this.productService.searchProducts(searchKeyword).subscribe((data) => {
    //   this.product = data;
    // });
    this.productService.searchProductPaginate(this.thePageNumber-1, this.thePageSiz, searchKeyword).subscribe(this.processResult());
  }

  handleListProduct() {
    const categorId: boolean = this.route.snapshot.paramMap.has('id');
    if (categorId) {
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    } else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(this.currentCategoryId, this.thePageNumber);

    // this.productService.getProductList(this.currentCategoryId).subscribe(data => {
    //   this.product = data;
    // })

    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSiz,
        this.currentCategoryId
      )
      .subscribe(this.processResult());
  }

  processResult() {
    return (data:any) => {
      this.product = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSiz = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  updatePageSize(pageSize: any) {
    this.thePageSiz = pageSize;
    this.thePageNumber = 1;
    this.listProduct();
  }

  addToCart(product: Product) {
    console.log(product);
    const theCartItem = new CartItem(product);

    this.cartService.addToCart(theCartItem);
  }
  
}
