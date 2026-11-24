import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResponseMessage } from "src/shared/interfaces/base.interface";
import { ProductInterface, ProductResponse } from "../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private http = inject(HttpClient);

  getProduct(isActive?: boolean):Observable<ProductInterface[]>{
    let params = new HttpParams();
    if (isActive !== undefined) {
      params = params.set('isActive', isActive);
    }
    return this.http.get<ProductInterface[]>(this.apiUrl, { params });
  }

  postProduct(create:ProductResponse):Observable<ResponseMessage>{
    return this.http.post<ResponseMessage>(`${this.apiUrl}`,create);
  }

  updateProduct(id:string,update:ProductResponse):Observable<ResponseMessage>{
    return this.http.patch<ResponseMessage>(`${this.apiUrl}/${id}`,update);
  }

  deleteProduct(id:string):Observable<ResponseMessage>{
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/${id}`);
  }
}
