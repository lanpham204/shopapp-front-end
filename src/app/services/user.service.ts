import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { HttpUtilService } from './http.util.service';
import { environment } from '../environments/environment';
import { User } from '../models/user';
import e from 'express';
import { UpdateUserDTO } from '../dtos/user/update_user_dto';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetails = `${environment.apiBaseUrl}/users/details`;

  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  }

  constructor(
    private http: HttpClient,
    private httpUtilService: HttpUtilService
  ) { }

  public register(registerDTO: RegisterDTO):Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }
  updateUser(token: string,updateUserDTO: UpdateUserDTO): Observable<any> {
    let user = this.getUserFromLocalStorage()
    return this.http.put(`${this.apiUserDetails}/${user?.id}`, updateUserDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
    });
  }
  getUserDetail(token: string): Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.apiUserDetails,{},{headers:headers})
  }
  saveUserToLocalStorage(user: User) {
    try {
      if(user === null || !user) {
        return;
      }
      const userJSON = JSON.stringify(user);
      localStorage.setItem('user',userJSON);
    } catch (error) {
      console.log('Error saving user to local storage ',error)
    }
  }
  getUserFromLocalStorage()  {
    try {
      const userJSON = localStorage.getItem('user');
      if(userJSON === null || userJSON == undefined) {
        return null;
      }
      const user = JSON.parse(userJSON!);
      return user;
    } catch (error) {
      console.log('Error retrieve user from local storage ',error)
    }
  }
  removeUserFromLocalStorage() {
    try {
      localStorage.removeItem('user')
    } catch (error) {
      console.log('Error remove user from local storage ',error)
    }
  }
}
