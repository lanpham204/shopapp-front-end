import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { HttpUtilService } from './http.util.service';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
import { OrderDTO } from '../dtos/order.dto';
import { Order } from '../models/order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiOrders = `${environment.apiBaseUrl}/orders`;

  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  }

  constructor(
    private http: HttpClient,
    private httpUtilService: HttpUtilService
  ) { }

  public createOrder(orderDTO: OrderDTO): Observable<any>  {
    return this.http.post(this.apiOrders,orderDTO,this.apiConfig);
  }
  public getOrderById(id: number): Observable<any>  {
    const params = new HttpParams();
    params.set('id',id.toString())
    return this.http.get<Order[]>(this.apiOrders+`/${id}`)
  }
  public getOrders(keyword: string, page: number,limit: number):Observable<Order[]> {
    page -= 1;
    const params = new HttpParams()
    .set('page',page.toString())
    .set('limit',limit.toString())
    .set('keyword',keyword.toString())
    return this.http.get<Order[]>(`${this.apiOrders}/get-orders-by-keyword`, {params});
  }

}
