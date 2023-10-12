import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ErrorHandlerService2_o } from '../utils/errorHandler/errorHandler-2.o/error-handler-2.o.service';
import { GenericService } from '../utils/generic-service/generic.service';
import { ApiEndpoints } from './api/ApiEndpoints';
import { IService } from './interfaces/I.service';
import { Users } from './models/users';

@Injectable({
  providedIn: 'root',
})
export class MainEmployeeService
  extends GenericService<Users>
  implements IService
{
  _http = inject(HttpClient);

  constructor(http: HttpClient, errorHandler: ErrorHandlerService2_o) {
    super(http, errorHandler);
  }

  getAll(): Observable<Users[]> {
    const URL = environment.apiUrl + ApiEndpoints.GET;
    return this.read(URL);
  }

  getData(): Observable<Users[]> {
    const URL = environment.apiUrl + ApiEndpoints.GET;
    return this._http.get<Users[]>(URL);
  }

  GetAlldata(): Observable<any> {
    throw new Error('Method not implemented.');
  }
  GetData(): Observable<Users[]> {
    throw new Error('Method not implemented.');
  }
}
