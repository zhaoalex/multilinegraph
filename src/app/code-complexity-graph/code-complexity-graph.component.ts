import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-complexity-graph',
  templateUrl: './code-complexity-graph.component.html',
  styleUrls: ['./code-complexity-graph.component.css']
})
export class CodeComplexityGraphComponent implements OnInit {
  // view: any[] = [350, 250];
  colorScheme = {
    domain: ['#1CBCD8', '#FF8D60', '#FF586B', '#AAAAAA']
  };
  data: any;
  // single: any;

  constructor() {
    this.data = [
      {
        'name': 'Cognitive Complexity',
        'value': 3652
      },
      {
        'name': 'Complexity/Class',
        'value': 23.5
      },
      {
        'name': 'Complexity/File',
        'value': 24.4
      },
      {
        'name': 'Complexity/Function',
        'value': 1.5
      }
    ];

    // assign colors
    this.data.forEach((d, i) => { d.color = this.colorScheme.domain[i]; });

    // Object.assign(this, { single: this.single });
  }

  ngOnInit() {
  }

  // onSelect(event) {
  //   console.log(event);
  // }

}
