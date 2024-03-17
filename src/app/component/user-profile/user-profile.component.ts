import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { UpdateUserDTO } from '../../dtos/user/update_user_dto';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  user?: User;
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router) {
    this.userForm = this.formBuilder.group({
      fullname: [''],
      address: ['',[ Validators.minLength(3)]],
      password: ['', [Validators.minLength(3)]],
      retype_password: ['', [Validators.minLength(3), this.passwordMatchValidator()]],
      date_of_birth: [Date.now()],
    });
  }

  ngOnInit(): void {
    let token = this.tokenService.getToken() ?? '';
    this.userService.getUserDetail(token).subscribe({
      next: (response: User)  => {
        debugger
        this.user = {
          ... response,
          date_of_birth: new Date(response.date_of_birth)
        };
        this.userForm.patchValue({
          fullname: this.user?.fullname ?? '',
          address: this.user?.address ?? '',
          date_of_birth:this.user?.date_of_birth ?? ''
        })
        this.userService.saveUserToLocalStorage(this.user)
      } ,error: (error: any) => {
        debugger
        alert(`${error.error}`)
      }
    })
  }
  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const retypedPassword = formGroup.get('retype_password')?.value;

      if (password !== retypedPassword) {
        return { passwordMismatch: true };
      }

      return null;
    };
  }
    save(): void {
      debugger
    let token = this.tokenService.getToken() ?? '';
      if(this.userForm.valid) {
        const updateUserDTO: UpdateUserDTO = {
          fullname: this.userForm.get('fullname')?.value,
          address: this.userForm.get('address')?.value,
          password: this.userForm.get('password')?.value,
          retype_password: this.userForm.get('retype_password')?.value,
          date_of_birth: this.userForm.get('date_of_birth')?.value
          };

        debugger
        this.userService.updateUser(token,updateUserDTO).subscribe({
          next: (response: any) => {
            this.userService.removeUserFromLocalStorage()
            this.tokenService.removeToken()
            this.router.navigate(['/login'])
          },error: (error: any) => {
            debugger
            console.log(`${error}`)
          }
        })
      } else {
        if(this.userForm.hasError('passwordMismatch')) {
          alert('Mật khẩu và mật khẩu nhập lại phải giống nhau')
        }
      }
    }
}

