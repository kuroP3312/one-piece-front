// EXPERNAL IMPORTS
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// INTERNAL IMPORTS
import { HttpService } from './http.service';
import { environment } from '../../../enviroment';


@Injectable({
  providedIn: 'root',
})
export class SagasService {
  // this are the module name
  ROUTE = `/sagas/en`;

  constructor(private httpService: HttpService) {}

  getAll(): Observable<any> {
    console.log("GetAll");
    
    return this.httpService.ejectQuery(`${this.ROUTE}`);
  }

}
