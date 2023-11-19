import {Injectable} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, finalize, retry, throwError } from 'rxjs';

const httpOption = {
    headers: new HttpHeaders({
        'content-Type': 'application/json'
    })
};

@Injectable()
export class HttpService {

    constructor(
        private http: HttpClient
    ){}

    post(model: any): Observable<any>{
        const body = JSON.stringify(model.parametros);
        return this.http.post<any>('https://localhost:44301/api/'+ model.controlador + '/' + model.action, body, httpOption)
        .pipe(retry(1), catchError(this.handleError), finalize(() => {}))
    }    

    handleError()
    {
        let errorMessage = 'error';        
        return throwError(errorMessage);
    }

}