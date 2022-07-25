import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = 'http://localhost:8080/api/products';
  private categoryUrl: string = 'http://localhost:8080/api/product-category';

  constructor(private http: HttpClient) {}

  getProductList(id: number): Observable<Product[]> {
    return this.http
      .get<GetResponse>(this.baseUrl + `/search/findByCategoryId?id=${id}`)
      .pipe(map((response) => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.http
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  searchProducts(searchKeyword: string | null): Observable<Product[]> {
    return this.http
      .get<GetResponse>(
        `${this.baseUrl}/search/findByNameContaining?name=${searchKeyword}`
      )
      .pipe(map((response) => response._embedded.products));
  }

  searchProductPaginate(
    page: number,
    pageSize: number,
    searchKeyword: string
  ): Observable<GetResponseProduct> {
    return this.http
      .get<GetResponseProduct>(
        this.baseUrl +
          `/search/findByNameContaining?name=${searchKeyword}&page=${page}&size=${pageSize}`
      )
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }

  getProductListPaginate(
    page: number,
    pageSize: number,
    id: number
  ): Observable<GetResponseProduct> {
    return this.http
      .get<GetResponseProduct>(
        this.baseUrl +
          `/search/findByCategoryId?id=${id}&page=${page}&size=${pageSize}`
      )
     // .pipe(map((response) => response._embedded.products));
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElement: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElement: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
