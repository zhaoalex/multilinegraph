import { Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-git-commit-graph',
  templateUrl: './git-commit-graph.component.html',
  styleUrls: ['./git-commit-graph.component.css']
})
export class GitCommitGraphComponent implements OnInit {

  data: any;
  options: any;

  title = 'Overview';

  @ViewChild('chart') chart: UIChart;

  constructor() {
    this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
            }
        ]
    };

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
          }
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
