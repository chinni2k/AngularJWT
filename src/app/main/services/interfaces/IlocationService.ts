import { Observable } from 'rxjs';


export interface IlocationService {
  getState(): Observable<any[]>;
  getHub(id: number): Observable<any>;
  addLocation(
    location: string,
    stateId: number,
    hubId: number,
    flag: string
  ): Observable<any>; 
}
