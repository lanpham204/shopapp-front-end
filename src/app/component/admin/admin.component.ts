import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink,
  CommonModule,FormsModule,AdminHeaderComponent,AdminSidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  activedNavItem: number = 0;
  adminComponent: string = 'orders'
  user?: User;
  constructor(private tokenService: TokenService,
    private userService: UserService,
    private router:Router ) {}
    ngOnInit(): void {
      this.router.navigate(['/admin/orders'])
    }
  logout() {
    this.tokenService.removeToken();
    this.userService.removeUserFromLocalStorage();
    this.user = this.userService.getUserFromLocalStorage();
    this.router.navigate(['/login'])
  }
  showAdminComponent(component: string,index: number) {
      this.adminComponent = component;
      this.activedNavItem = index
  }
}
