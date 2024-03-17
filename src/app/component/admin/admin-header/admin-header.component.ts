import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterLink,
    CommonModule,FormsModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent  {

  user?: User;
  constructor(private tokenService: TokenService,
    private userService: UserService,
    private router:Router ) {}
    ngOnInit(): void {
      this.user = this.userService.getUserFromLocalStorage();
    }
  logout() {
    this.tokenService.removeToken();
    this.userService.removeUserFromLocalStorage();
    this.user = this.userService.getUserFromLocalStorage();
    this.router.navigate(['/login'])
  }

}
