import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/user/login.dto';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { TokenService } from '../../services/token.service';
import { Role } from '../../models/role';
import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [HttpClientModule, CommonModule,FormsModule,
    FooterComponent, HeaderComponent,]
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  phoneNumber: string = '2222222222';
  password: string = '123';

  roles: Role[] = [];
  rememberme: boolean = true;
  selectedRole: Role | undefined
  user?:User


  onPhoneNumberChange() {
    console.log(`Phone typed: ${this.phoneNumber}`);
  }
  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) { }



  login() {

    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    };
    this.userService.login(loginDTO).subscribe({
      next: (response: any) => {
        const token = response.token
        const roleId = response.role_id;
        if(this.rememberme) {

          this.tokenService.setToken(token);
          this.userService.getUserDetail(token).subscribe({
            next: (response: User) => {
              debugger
              this.user = {
                ...response,
                date_of_birth: new Date(response.date_of_birth)
              }
              this.userService.saveUserToLocalStorage(this.user)
              if(this.user.role.name === 'USER') {
                this.router.navigate([''])
              } else if(this.user.role.name === 'ADMIN') {
                this.router.navigate(['/admin'])
              }
            },
          complete: () => {

              },
          error: (error: any) => {
            console.log(error)
            alert(error.error.message);
          }
          })
        }

      },
      complete: () => {

      },
      error: (error: any) => {
        console.log(error)
        alert(error.error.message);
      }
    });
  }
  ngOnInit() {

  }
}
