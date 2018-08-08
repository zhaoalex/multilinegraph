import { Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import * as d3 from 'd3';

@Component({
  selector: 'app-git-commit-graph',
  templateUrl: './git-commit-graph.component.html',
  styleUrls: ['./git-commit-graph.component.css']
})
export class GitCommitGraphComponent implements OnInit {

  data: any;
  options: any;

  title = 'Overview';

  color: any;

  @ViewChild('chart') chart: UIChart;
  @ViewChild('legend') legend: any;

  constructor() {

    this.color = d3.scaleOrdinal(d3.schemeCategory20).range();

    this.data = {
      labels: ['Jun 26', 'Jun 27', 'Jun 28', 'Jun 29', 'Jun 30', 'Jul 1', 'Jul 2'],
      datasets: [
        {
          label: 'Apurva Mehta',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Farneet Khehra',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        },
        {
          label: 'Alex Zhao',
          data: [1, 71, 5, 19, 6, 3, 90],
          fill: false,
          borderColor: '#185729'
        },
        {
          label: 'Alex Zhao 2',
          data: [1, 1, 1, 1, 1, 1, 1],
          fill: false,
          borderColor: '#123456'
        },
        {
          label: 'Alex Zhao 3',
          data: [10, 11, 12, 13, 14, 15, 16],
          fill: false,
          borderColor: '#654321'
        },
        {
          label: 'Alex Zhao 4',
          data: [1, 4, 9, 16, 25, 36, 49],
          fill: false,
          borderColor: '#142536'
        }
      ]
    };

    // setting colors using d3's scheme categories
    for (let i = 0; i < this.data.datasets.length; i++) {
      this.data.datasets[i].borderColor = this.color[i * 2];
      this.data.datasets[i].backgroundColor = this.color[i * 2 + 1];
    }

    // find max value of data and set as dataMax
    let dataMax = -1;
    let currMax = -1;
    this.data.datasets.forEach(d => {
      currMax = Math.max(...d.data);
      if (currMax > dataMax) {
        dataMax = currMax;
      }
    });

    // round up to nearest 10
    dataMax = Math.ceil(dataMax / 10) * 10;

    this.options = {
      legend: {
        onClick: (_, item) => {
          this.title = item.text; // set the title based on dataset name (committer name)

          const datasets = this.chart.data.datasets;
          const index = item.datasetIndex;
          let meta = datasets[index]._meta[0];

          if (meta.hidden === null) { // user clicked a non-hidden option, so toggle everything else
            datasets.forEach((d, i) => {
              if (index === i) { return; } // don't toggle the clicked option!
              meta = d._meta[0];
              if (meta.hidden === null) {
                meta.hidden = !this.chart.data.datasets[i].hidden;
              } else {
                this.title = 'Overview'; // if toggling back to non-hidden, change name back to overview
                meta.hidden = null;
              }
              // meta.hidden = meta.hidden === null ? !this.chart.data.datasets[i].hidden : null;
            });
          } else { // user clicked a hidden option; make that the only non-hidden one
            datasets.forEach((d, i) => {
              if (index === i) {
                d._meta[0].hidden = null;
              } else {
                d._meta[0].hidden = true;
              }
            });
          }

          this.update();
        },
        onHover: (event, item) => {

        }
      },
      scales: {
        yAxes: [{
          stacked: false,
          ticks: {
            beginAtZero: true,
            suggestedMax: dataMax
          }
        }]
      }
    };
  }

  ngOnInit() {
    this.update();
  }

  update() {
    setTimeout(() => this.chart.refresh(), 100);
  }
}
