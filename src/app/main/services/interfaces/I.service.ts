import { Observable } from "rxjs";
import { Users } from "../models/users";



export interface IService {

 GetAlldata():Observable<any>;
 GetData(): Observable<Users[]>

}
