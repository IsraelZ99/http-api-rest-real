import { Injectable } from '@angular/core';
import { CityI } from "../../models/city/city.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private urlAPI = 'https://dominicode-api.herokuapp.com/api/cities';

  constructor(private http: HttpClient) { }

  getAllCities(): Observable<CityI[]> {
    return this.http.get<CityI[]>(this.urlAPI);
  }

  addNewCity(city: CityI): Observable<CityI> {
    return this.http.post<CityI>(this.urlAPI, city);
  }

  updateCities(city: CityI): Observable<CityI> {
    this.urlAPI = `${this.urlAPI}/${city.id}`
    return this.http.put<CityI>(this.urlAPI, city);
  }

  deleteCity(id: number): Observable<{}> {
    this.urlAPI = `${this.urlAPI}/${id}`;
    return this.http.delete(this.urlAPI);
  }

}
