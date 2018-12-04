import { Component, Input } from '@angular/core';
import { Population } from '../../../model/population';

@Component({
  selector: 'app-population-chart',
  templateUrl: './population-chart.component.html',
  styleUrls: ['./population-chart.component.scss']
})
export class PopulationChartComponent {

  barChartData: { data: number[], label: string }[] = [];
  barChartLabels: string[] = [];
  barChartColors = [
    // males
    {
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
      hoverBorderColor: 'rgba(54, 162, 235, 1)'
    },
    // females
    {
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
      hoverBorderColor: 'rgba(255, 99, 132, 1)'
    },
    // total
    {
      backgroundColor: 'rgba(255, 206, 86, 0.6)',
      borderColor: 'rgba(255, 206, 86, 1)',
      hoverBackgroundColor: 'rgba(255, 206, 86, 0.8)',
      hoverBorderColor: 'rgba(255, 206, 86, 1)'
    }
  ];
  barChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Age'
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        title: ([tooltipItem]) => `Age: ${tooltipItem.xLabel}`
      }
    }
  };

  @Input()
  set population(population: Population[]) {
      const data = population.reduce((acc, curr) => {
        this.barChartLabels.push(curr.age);
        acc.males.data.push(curr.males);
        acc.females.data.push(curr.females);
        acc.total.data.push(curr.total);
        return acc;
      }, {'males': {data: [], label: '# Males'}, 'females': {data: [], label: '# Females'}, 'total': {data: [], label: '# Total'}});
      this.barChartData = Object.values(data);
  }
}
