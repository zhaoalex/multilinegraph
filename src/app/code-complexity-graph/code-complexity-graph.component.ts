import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-code-complexity-graph',
  templateUrl: './code-complexity-graph.component.html',
  styleUrls: ['./code-complexity-graph.component.css']
})
export class CodeComplexityGraphComponent implements OnInit {
  view: any[] = [350, 250];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  single: any;

  constructor() {
    this.single = [
      {
        'name': 'Complexity/Func',
        'value': 3.2
      },
      {
        'name': 'Complexity/File',
        'value': 30
      },
      {
        'name': 'Complexity/Class',
        'value': 15.2
      }
    ];

    Object.assign(this, { single: this.single });
  }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }

}
