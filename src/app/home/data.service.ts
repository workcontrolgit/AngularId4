import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


const apiUrl = 'https://devkit-api-employeeprofile.azurewebsites.net/api/v1/Persons';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getPersons(): Observable<any> {
    return this.httpClient.get(apiUrl)
  };
  }
