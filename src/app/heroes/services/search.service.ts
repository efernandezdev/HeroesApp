import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _url: string = 'https://superheroapi.com/api.php';
  private _token: string = environment.tokenApi;
  private _api: string = `${this._url}/${this._token}`;

  constructor(private http: HttpClient) {}

  search(name: string) {
    return this.http.get(`${this._api}/search/${name}`);
  }

  addMember(id: string) {
    return this.http.get(`${this._api}/${id}`);
  }
}
