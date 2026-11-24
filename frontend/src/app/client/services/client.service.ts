import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ClienteResponse, ClientInterface } from "../interfaces/client.interface";
import { ResponseMessage } from "src/shared/interfaces/base.interface";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}/client`;
  private http = inject(HttpClient);

  getClient(isActive?: boolean):Observable<ClientInterface[]>{
    let params = new HttpParams();
    if (isActive !== undefined) {
      params = params.set('isActive', isActive);
    }
    return this.http.get<ClientInterface[]>(this.apiUrl, { params });
  }

  postClient(create:ClienteResponse):Observable<ResponseMessage>{
    return this.http.post<ResponseMessage>(`${this.apiUrl}`,create); 
  }

  updateClient(id:string,update:ClienteResponse):Observable<ResponseMessage>{
    return this.http.patch<ResponseMessage>(`${this.apiUrl}/${id}`,update);
  }

  deleteClient(id:string):Observable<ResponseMessage>{
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/${id}`);
  }

}
