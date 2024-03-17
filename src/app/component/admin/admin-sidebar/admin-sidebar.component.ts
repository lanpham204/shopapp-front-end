import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink,
    CommonModule,FormsModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {
  activedNavItem: number = 0;
  adminComponent: string = 'orders'
  showAdminComponent(component: string,index: number) {
    this.adminComponent = component;
    this.activedNavItem = index
}
}
