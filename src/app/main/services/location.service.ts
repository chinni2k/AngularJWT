import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService2_o } from '../utils/errorHandler/errorHandler-2.o/error-handler-2.o.service';
import { GenericService } from '../utils/generic-service/generic.service';
import { IlocationService } from './interfaces/IlocationService';

@Injectable({
  providedIn: 'root',
})
export class LocationService
  extends GenericService<any>
  implements IlocationService
{
  _http = inject(HttpClient);
  constructor(ErrorHandler: ErrorHandlerService2_o, Http: HttpClient) {
    super(Http, ErrorHandler);
  }

  getState(): Observable<any[]> {
    let BaseUrl = environment.apiUrl + 'HLFSP/GetState';

    return this.read(BaseUrl);

    //return this._http.get<any[]>(BaseUrl);
  }
  getHub(id: number): Observable<any> {
    let BaseUrl = environment.apiUrl + `HLFSP/GetHub/${id}`;
    return this._http.get<any>(BaseUrl);
  }

  // addLocation(location: string, stateId: number, hubId: number, flag: string) {
  //   let Result = {
  //     Location: location,
  //     stateId: stateId,
  //     hubId: hubId,
  //     flag: flag,
  //   };
  //   let BaseUrl =
  //     environment.apiUrl +
  //     `HLFSP/AddLocation?state_id=${stateId}&hub_id=${hubId}&Location_Name=${location}`;
  //   debugger;
  //   return this._http.post<any>(BaseUrl, Result);
  // }

  addLocation(
    location: string,
    stateId: number,
    hubId: number,
    flag: string
  ): Observable<any> {
    let Result = {
      Location: location,
      stateId: stateId,
      hubId: hubId,
      flag: flag,
    };
    let BaseUrl =
      environment.apiUrl +
      `HLFSP/AddLocation?state_id=${stateId}&hub_id=${hubId}&Location_Name=${location}`;
    debugger;
    return this._http.post<any>(BaseUrl, Result);
  }

  SourceData = (): Observable<any> => {
    const BaseAPIUrl = environment.apiUrl + `HLFSP/GetState`;
    return this._http.get<any>(BaseAPIUrl);
  };
}
