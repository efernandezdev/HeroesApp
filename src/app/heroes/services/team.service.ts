import { Injectable } from '@angular/core';

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

  public average: any = { weight: 0, height: 0 };

  public alignmentGood: number = 3;
  public alignmentBad: number = 3;

  constructor() {}
}
