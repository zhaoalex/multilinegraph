import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-commit-trends-graph',
  templateUrl: './code-commit-trends-graph.component.html',
  styleUrls: ['./code-commit-trends-graph.component.css']
})
export class CodeCommitTrendsGraphComponent implements OnInit {
  data: any;

  constructor() {
    this.data = {
      labels: ['Jun 26', 'Jun 27', 'Jun 28', 'Jun 29', 'Jun 30', 'Jul 1', 'Jul 2'],
      datasets: [
        {
          label: 'IDP',
          data: [65, 59, 80, 81, 56, 55, 1],
          fill: false
        },
        {
          label: 'AMS',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false
        },
        {
          label: 'IMP',
          data: [1, 71, 5, 19, 6, 3, 90],
          fill: false
        }
      ]
    };
  }

  ngOnInit() {
    // TODO: hook to a service for data
  }
}
