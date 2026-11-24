import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Param } from "src/shared/interfaces/base.interface";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
    private apiUrl = `${environment.apiUrl}/document-type`;
    private http = inject(HttpClient);

    getDocument():Observable<Param[]>{
        return this.http.get<Param[]>(this.apiUrl);
    }

}
