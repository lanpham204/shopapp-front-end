import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { HttpUtilService } from './http.util.service';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiGetProducts = `${environment.apiBaseUrl}/products`;

  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  }

  constructor(
    private http: HttpClient,
    private httpUtilService: HttpUtilService
  ) { }

  public getProducts(categoryId: number,keyword: string, page: number,limit: number):Observable<Product[]> {
    page -= 1;
    const params = new HttpParams()
    .set('page',page.toString())
    .set('limit',limit.toString())
    .set('category_id',categoryId.toString())
    .set('keyword',keyword.toString())
    return this.http.get<Product[]>(this.apiGetProducts, {params});
  }
  public getDetailProduct(productId: number): Observable<any>  {
    return this.http.get(`${environment.apiBaseUrl}/products/${productId}`);
  }
  public getDetailProductByIds(productIds: number[]): Observable<any>  {
    const params = new HttpParams().set('ids',productIds.join(','));
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/products/by-ids`,{params});
  }

}
