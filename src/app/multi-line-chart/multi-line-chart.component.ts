import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UIChart } from 'primeng/chart';
import * as d3 from 'd3';

@Component({
  selector: 'app-multi-line-chart',
  templateUrl: './multi-line-chart.component.html',
  styleUrls: ['./multi-line-chart.component.css']
})
export class MultiLineChartComponent implements OnInit {

  // TODO: look into small screen issues, possibly implement a timeline thing?

  @Input() data: any;
  options: any;

  title = 'Overview (click legend item to focus)';

  color: any;

  @ViewChild('chart') chart: UIChart;
  // @ViewChild('legend') legend: any;

  constructor() {}

  ngOnInit() {
    this.color = d3.scaleOrdinal(d3.schemeCategory10).range();
    // this.shuffle(this.color);

    // this.data = {
    //   labels: ['Jun 26', 'Jun 27', 'Jun 28', 'Jun 29', 'Jun 30', 'Jul 1', 'Jul 2'],
    //   datasets: [
    //     {
    //       label: 'IDP',
    //       data: [65, 59, 80, 81, 56, 55, 1],
    //       fill: false
    //     },
    //     {
    //       label: 'AMS',
    //       data: [28, 48, 40, 19, 86, 27, 90],
    //       fill: false
    //     },
    //     {
    //       label: 'IMP',
    //       data: [1, 71, 5, 19, 6, 3, 90],
    //       fill: false
    //     }
    //   ]
    // };

    // setting colors using d3's scheme categories
    for (let i = 0; i < this.data.datasets.length; i++) {
      // this.data.datasets[i].borderColor = this.color[i * 2];
      // this.data.datasets[i].backgroundColor = this.color[i * 2 + 1];
      this.data.datasets[i].borderColor = this.color[i];
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
          this.title = item.text; // set the title based on dataset name

          const datasets = this.chart.data.datasets;
          const index = item.datasetIndex;
          let meta = this.getMeta(datasets[index]);

          if (meta.hidden === null) { // user clicked a non-hidden option, so toggle everything else
            datasets.forEach((d, i) => {
              if (index === i) { return; } // don't toggle the clicked option!
              meta = this.getMeta(d);
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
              meta = this.getMeta(d);
              if (index === i) {
                meta.hidden = null;
              } else {
                meta.hidden = true;
              }
            });
          }

          this.update();
        },
        onHover: (event, item) => {
          // TODO: legend styling?
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

    this.update();
  }

  update() {
    setTimeout(() => this.chart.refresh(), 200);
  }

  getMeta(dataset: any) {
    // workaround for multiple chart.js graphs on one page
    return dataset._meta[Object.keys(dataset._meta)[0]];
  }

  // // Durstenfeld shuffle
  // shuffle(arr: Array<string>) {
  //   for (let i = arr.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [arr[i], arr[j]] = [arr[j], arr[i]];
  //   }
  // }
}
