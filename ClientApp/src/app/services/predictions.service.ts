import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  throwError, from, Observable } from 'rxjs';
import { retry, catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PredictionsService {
    private apiURL = "/api/"
    constructor(private http: HttpClient) { }
    //private httpOptions = {
    //    headers: new HttpHeaders({
    //        'Content-Type': 'application/json'
    //    })
    //}

    search(terms: Observable<string>, apiName: apiNamesEnum) {

        return terms.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(term => this.searchEntries(term, apiName ))
        )
           

        //return this.http.get<Word>(`${this.apiURL}/${apiName}?text=${text}`)
        //    .pipe(
        //        retry(1),
        //        catchError(this.handleError)
        //    )
    }

    private searchEntries(term, apiName) {
        return this.http.get<Word[]>(`${this.apiURL}${apiName}?text=${term}`)
                               .pipe(
                                  catchError(this.handleError)
                              )
    }

    // Error handling 
    private handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        
        return throwError(errorMessage);
    }
}

export enum apiNamesEnum {
    DictionaryApi = 'Dictionary',
    WizkidsApi = 'WizkidsApi'
}
