import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HoroscopoService {

  constructor( private http: HttpClient ) { }

  getHoroscopos() {
    let url = 'https://api.adderou.cl/tyaas/';
      return this.http.get(url);
  }

}
