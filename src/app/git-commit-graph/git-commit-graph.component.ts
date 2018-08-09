import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-git-commit-graph',
  templateUrl: './git-commit-graph.component.html',
  styleUrls: ['./git-commit-graph.component.css']
})
export class GitCommitGraphComponent implements OnInit {
  data: any;

  constructor() {
    this.data = {
      labels: ['Jun 26', 'Jun 27', 'Jun 28', 'Jun 29', 'Jun 30', 'Jul 1', 'Jul 2'],
      datasets: [
        {
          label: 'Apurva Mehta',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false
        },
        {
          label: 'Farneet Khehra',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false
        },
        {
          label: 'Alex Zhao',
          data: [1, 71, 5, 19, 6, 3, 90],
          fill: false
        },
        {
          label: 'Alex Zhao 2',
          data: [1, 1, 1, 1, 1, 1, 1],
          fill: false
        },
        {
          label: 'Alex Zhao 3',
          data: [10, 11, 12, 13, 14, 15, 16],
          fill: false
        },
        {
          label: 'Alex Zhao 4',
          data: [1, 4, 9, 16, 25, 36, 49],
          fill: false
        }
      ]
    };
  }

  ngOnInit() {}
}
