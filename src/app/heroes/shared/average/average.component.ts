import { Component, OnInit } from '@angular/core';
import {TeamService} from '../../services/team.service';

@Component({
  selector: 'app-average',
  templateUrl: './average.component.html',
  styleUrls: ['./average.component.css']
})
export class AverageComponent implements OnInit {

  constructor(public teamService:TeamService) { }

  ngOnInit(): void {
  }

}
