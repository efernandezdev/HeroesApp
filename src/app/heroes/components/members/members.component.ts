import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  public members: any;

  constructor(private teamService: TeamService) {
    if (!localStorage.getItem('team')) {
      localStorage.setItem('team', '[]');
    }
    this.accumulate();
    this.average();
    this.members = JSON.parse(localStorage.getItem('team') || '[]');
  }

  ngOnInit(): void {}

  deleteMember(id: string) {
    let members = JSON.parse(localStorage.getItem('team') || '[]');
    let newMembers = members.filter((member: any) => member.id !== id);
    this.members = newMembers;
    localStorage.setItem('team', JSON.stringify(newMembers));
    this.average();
    this.accumulate();
  }

  accumulate() {
    let members = JSON.parse(localStorage.getItem('team') || '[]');

    if (members.length) {
      let acc = members.map(function (member: any) {
        // console.log(member.powerstats);
        return member.powerstats;
      });

      let newAcc: any[] = [];

      if (acc.length) {
        let keys = Object.keys(acc[0]);
        for (let i = 0; i < keys.length; i++) {
          let keysValue: any = [];
          for (let j = 0; j < acc.length; j++) {
            keysValue.push(parseInt(acc[j][keys[i]]));
          }
          let actKey: any = `${keys[i]}`;
          newAcc[actKey] = keysValue.reduce(
            (acc: number, act: number) => (acc += act)
          );
        }
      }

      // console.log('members', newAcc);
      if (acc.length) {
        //
        // Sort Object
        //
        this.teamService.powerstats = Object.keys(newAcc)
          .sort((member1, member2) => newAcc[member2] - newAcc[member1])
          .reduce(
            (obj, key) => ({
              ...obj,
              [key]: newAcc[key],
            }),
            {}
          );
      }
    } else {
      //
      // Initialize Powerstats
      //
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
      console.log(acc);

      let newAve: any = [];
      if (acc.length) {
        for (let i = 0; i < acc[0].length; i++) {
          let newArr: any[] = [];
          for (let j = 0; j < acc.length; j++) {
            newArr.push(acc[j][i]);
          }
          newAve.push(newArr.reduce((acu, act) => (acu += act)));
        }
        let arrObj: any = [];
        let values = newAve.map((ave: number) => ave / acc.length);

        arrObj.height = values[0];
        arrObj.weight = values[1];
        console.log(arrObj);
        this.teamService.average = arrObj;
      }
    } else {
      this.teamService.average = { weight: 0, height: 0 };
    }
  }
}
