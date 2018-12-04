import { Component, OnInit } from '@angular/core';
import { Population } from '../model/population';
import { PopulationService } from '../service/population.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  populationData: Population[] = [];

  constructor(private populationService: PopulationService) { }

  ngOnInit(): void {
    this.populationService.getPopulation().subscribe(res => this.populationData = res);
  }
}
