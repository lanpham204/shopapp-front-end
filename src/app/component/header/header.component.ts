import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user?: User
  activedNavItem: number = 0;
  constructor(private tokenService: TokenService,
    private userService: UserService,
    private router:Router ) {}
    showDropdown = false;
  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();
  }
  isLoggedIn() {
    if(this.tokenService.getToken() === null) {
      return false;
    }
    return true;
  }
  logout() {
    this.tokenService.removeToken();
    this.userService.removeUserFromLocalStorage();
    this.user = this.userService.getUserFromLocalStorage();
  }
  setActiveNavItem(index: number) {
    this.activedNavItem = index
  }
}
