import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { HttpUtilService } from "./http.util.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class RoleServuce {
    private apiGetAll = `${environment.apiBaseUrl}/roles`

    constructor( private httpClient: HttpClient
        ) {
    }

    getAllRoles(): Observable<any> {
        return this.httpClient.get<any[]>(this.apiGetAll)
    }
}
