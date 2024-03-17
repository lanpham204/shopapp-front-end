import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { HttpUtilService } from "./http.util.service";
import { Observable } from "rxjs";
import { Category } from "../models/category";

@Injectable({
    providedIn: 'root'
  })
export class CategoryService {
    private apiGetAll = `${environment.apiBaseUrl}/categories`

    constructor( private httpClient: HttpClient
        ) {
    }

    getCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(this.apiGetAll)
    }
}
