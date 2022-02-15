import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-add-heroes',
  templateUrl: './add-heroes.component.html',
  styleUrls: ['./add-heroes.component.css'],
})
export class AddHeroesComponent implements OnInit {
  public searchForm = this.fb.group({
    search: ['', Validators.required],
  });

  public heroes: any = [];
  public good: number;
  public bad: number;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private teamService: TeamService
  ) {
    if (!localStorage.getItem('team')) {
      localStorage.setItem('team', '[]');
    }
    this.accumulate();
    this.average();
    this.good = teamService.alignmentGood;
    this.bad = teamService.alignmentBad;
  }

  ngOnInit(): void {}

  search() {
    this.searchService.search(this.searchForm.value.search).subscribe({
      next: (res) => {
        /////////////
        // Filter heroes to alignment bad or good
        /////////////
        let filterSearch = Object.values(res['results']).filter(
          (filter) =>
            filter['biography']['alignment'] === 'bad' ||
            filter['biography']['alignment'] === 'good'
        );

        this.heroes = filterSearch;
      },
      error: (err) => {
        console.log(err);
        this.heroes = [];
      },
    });
  }

  addMember(id: string, alignment: string) {
    
    let members = JSON.parse(localStorage.getItem('team') || '[]');
    
    if (!members.some((member:any) => member['id'] === id)) {
      if (this.good != 0 && alignment == 'good') {
        this.searchService.addMember(id).subscribe({
          next: (res) => {
            members.push(res);
            localStorage.setItem('team', JSON.stringify(members));
            this.teamService.alignmentGood -= 1;
            this.good = this.teamService.alignmentGood;
            this.accumulate();
            this.average();
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else if (this.bad != 0 && alignment == 'bad') {
        this.searchService.addMember(id).subscribe({
          next: (res) => {
            members.push(res);
            localStorage.setItem('team', JSON.stringify(members));
            this.teamService.alignmentBad -= 1;
            this.bad = this.teamService.alignmentBad;
            this.accumulate();
            this.average();
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        console.log('Ocupaste todos', alignment);
      }
    } else {
      console.log('Member is in your team');
    }
  }

  accumulate() {
    let members = JSON.parse(localStorage.getItem('team') || '[]');

    if (members.length) {
      let acc = members.map(function (member: any) {
        return member.powerstats;
      });
      let newAcc: any[] = [];
      let keys = Object.keys(acc[0]);

      /////////////
      // Reduce and accumalate all powerstats
      /////////////
      for (let i = 0; i < keys.length; i++) {
        let keysValue: any = [];
        for (let j = 0; j < acc.length; j++) {
          keysValue.push(parseInt(acc[j][keys[i]]) || 0);
        }
        let actKey: any = `${keys[i]}`;
        newAcc[actKey] = keysValue.reduce(
          (acc: number, act: number) => (acc += act)
        );
      }

      /////////////
      // Sorted accumulate descending
      /////////////
      this.teamService.powerstats = Object.keys(newAcc)
        .sort((member1, member2) => newAcc[member2] - newAcc[member1])
        .reduce(
          (obj, key) => ({
            ...obj,
            [key]: newAcc[key],
          }),
          {}
        );
    } else {
      this.teamService.powerstats = {
        intelligence: '0',
        strength: '0',
        speed: '0',
        durability: '0',
        power: '0',
        combat: '0',
      };
    }
  }

  average() {
    let members = JSON.parse(localStorage.getItem('team') || '[]');

    if (members.length) {
      let acc = members.map(function (member: any) {
        let height = parseInt(member.appearance.height[1].split(' ')[0]);
        let weight = parseInt(member.appearance.weight[1].split(' ')[0]);
        return [height, weight];
      });

      /////////////
      //Average height and weight
      /////////////

      let newAve: any = [];

      for (let i = 0; i < acc[0].length; i++) {
        let newArr: any[] = [];
        for (let j = 0; j < acc.length; j++) {
          newArr.push(acc[j][i]);
        }
        newAve.push(newArr.reduce((acu, act) => (acu += act)));
        let arrObj: any = [];
        let values = newAve.map((ave: number) => ave / acc.length);

        arrObj.height = values[0];
        arrObj.weight = values[1];
        this.teamService.average = arrObj;
      }
    } else {
      this.teamService.average = { weight: 0, height: 0 };
    }
  }
}
