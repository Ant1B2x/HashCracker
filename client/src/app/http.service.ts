import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  checkHash(hash: string) {
    return this.http.post(this.url + '/hash', JSON.stringify({hash: hash}), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      observe: 'response'
    });
  }

  addPassword(password: string) {
    return this.http.post(this.url + '/password', JSON.stringify({password: password}), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      observe: 'response'
    });
  }

}
