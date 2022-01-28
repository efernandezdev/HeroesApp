import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  public powerstats: any = {
    intelligence: '0',
    strength: '0',
    speed: '0',
    durability: '0',
    power: '0',
    combat: '0',
  };
  
  public average:any = { weight: 0, height: 0 };

  private _url: string = 'https://superheroapi.com/api.php';
  private _token: string = environment.tokenApi;
  private _api: string = `${this._url}/${this._token}`;

  constructor(private http: HttpClient) {}

  addMember(id: string) {
    return this.http.get(`${this._api}/${id}`);
  }
}
