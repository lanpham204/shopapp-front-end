import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { environment } from '../../environments/environment';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { OrderDetail } from '../../models/order_detail';

@Component({
    selector: 'app-order-detail',
    standalone: true,
    templateUrl: './order-detail.component.html',
    styleUrl: './order-detail.component.scss',
    imports: [FooterComponent, HeaderComponent,CommonModule,FormsModule]
})
export class OrderDetailComponent implements OnInit {
    totalAmount: number = 0;
    order: Order = {
    id:0,
    user_id:0,
    fullname:'',
    email:'',
    phone_number:'',
    address:'',
    note:'',
    order_date: new Date(),
    status: '',
    total_money:0,
    shipping_method:'',
    shipping_address:'',
    shipping_date: new Date(),
    payment_method:'',
    order_details:[]
    }
    constructor(
        private orderService:OrderService) {}
    ngOnInit(): void {
        this.orderService.getOrderById(12).subscribe({
            next: (response: any) => {
                this.order.id = response.id;
                this.order.user_id = response.user_id;
                this.order.fullname = response.fullname;
                this.order.email = response.email;
                this.order.phone_number = response.phone_number;
                this.order.address = response.address;
                this.order.note  = response.note;
                this.order.total_money = response.total_money
                this.order.order_date = new Date(response.order_date);
                this.order.payment_method = response.payment_method;
                this.order.shipping_method = response.shipping_method;
                this.order.shipping_date = new Date(response.shipping_date);
                this.order.status = response.status;
                this.order.order_details = response.order_details.map((order_detail: OrderDetail) => {
                    if(!order_detail.product.thumbnail.startsWith(`${environment.apiBaseUrl}`))
                    order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
                    return order_detail
                })
            }
            ,error: (error: any) => {
                console.error('Error retrieve order detail: ',error)
            }
        })
    }



}
