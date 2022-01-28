import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-accumulate',
  templateUrl: './accumulate.component.html',
  styleUrls: ['./accumulate.component.css'],
})
export class AccumulateComponent implements OnInit {
  public members: any;

  constructor(public teamService: TeamService) {}

  ngOnInit(): void {}

  returnZero() {
    return 0;
  }
}
