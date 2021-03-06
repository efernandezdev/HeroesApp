import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [NgbModal],
})
export class MembersComponent implements OnInit {
  public members: any;
  public good: number;
  public bad: number;

  constructor(
    private teamService: TeamService,
    private modalService: NgbModal
  ) {
    if (!localStorage.getItem('team')) {
      localStorage.setItem('team', '[]');
      localStorage.setItem('bad', '3');
      localStorage.setItem('good', '3');
    }
    this.accumulate();
    this.average();
    this.good = parseInt(localStorage.getItem('good'));
    this.bad = parseInt(localStorage.getItem('bad'));
    this.members = JSON.parse(localStorage.getItem('team') || '[]');
  }

  ngOnInit(): void {}

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  deleteMember(id: string, alignment: string) {
    let members = JSON.parse(localStorage.getItem('team') || '[]');
    let newMembers = members.filter((member: any) => member.id !== id);
    if (alignment == 'good') {
      this.good += 1;
      localStorage.setItem('good', JSON.stringify(this.good));
    } else if (alignment == 'bad') {
      this.bad += 1;
      localStorage.setItem('bad', JSON.stringify(this.bad));
    }
    this.members = newMembers;
    localStorage.setItem('team', JSON.stringify(newMembers));
    this.average();
    this.accumulate();
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
