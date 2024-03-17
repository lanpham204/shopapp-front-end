import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Router, RouterLink } from '@angular/router';
import { Order } from '../../../models/order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-order-admin',
  standalone: true,
  imports: [CommonModule,FormsModule,AdminHeaderComponent,AdminSidebarComponent,RouterLink],
  templateUrl: './order-admin.component.html',
  styleUrl: './order-admin.component.scss'
})
export class OrderAdminComponent {
  orders: Order[] = [];
  currentPage: number = 1;
  limit: number = 10;
  pages: number[] = [];
  totalPages: number = 0;
  keyword: string = "";
  visiblePage:number[] =[]
  constructor(private orderService: OrderService,private router: Router) {}
  ngOnInit(): void {
    this.getOrders(this.keyword,this.currentPage,this.limit);
  }
  getOrders(keyword: string,page: number,limit: number) {
    debugger
    this.orderService.getOrders(keyword,page,limit).subscribe
    ({
      next: (response:any) => {
        debugger
        this.orders = response.orders;
        // this.orders.map(order => {
        //   order.order_date = new Date(order.order_date)})
        this.totalPages =  response.totalPages;
        this.visiblePage = this.generateVisiblePageArray(this.currentPage,this.totalPages);
      },error: (error: any) => {
        debugger
        console.log('Error retrieve orders: ',error)
    }
    })
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getOrders(this.keyword,this.currentPage,this.limit)
}
  searchOrders() {
      this.currentPage = 1;
      this.limit = 12;
      this.getOrders(this.keyword,this.currentPage,this.limit)
  }
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const visiblePages = [];

    const totalVisiblePages = 5;
    const halfVisiblePages = Math.floor(totalVisiblePages / 2);

    let startPage = currentPage - halfVisiblePages;
    let endPage = currentPage + halfVisiblePages;

    if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(totalVisiblePages, totalPages);
    }

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - totalVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
    }

    return visiblePages;
}
}
