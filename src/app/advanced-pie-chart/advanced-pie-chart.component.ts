import { Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import * as d3 from 'd3';

@Component({
  selector: 'app-advanced-pie-chart',
  templateUrl: './advanced-pie-chart.component.html',
  styleUrls: ['./advanced-pie-chart.component.css']
})
export class AdvancedPieChartComponent implements OnInit {
  data: any;
  options: any;
  color: any;
  plugin: any;

  @ViewChild('chart') chart: UIChart;

  constructor() {
    this.color = d3.scaleOrdinal(d3.schemeCategory10).range();

    this.data = {
      labels: ['Major', 'Minor', 'Critical', 'Blocker'],
      datasets: [{
        data: [81, 194, 10, 2],
        backgroundColor: this.color
      }]
    };

    this.options = {
      elements: {
        center: {
          text: `Total: ${this.data.datasets[0].data.reduce((acc, curr) => acc + curr)}`,
          sidePadding: 10
        }
      },
      pieceLabel: {
        render: 'percentage',
        // fontColor: data => {
        //   const rgb = this.hexToRgb(data.dataset.backgroundColor[data.index]);
        //   const threshold = 140;
        //   const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
        //   return luminance > threshold ? 'black' : 'white';
        // },
        fontColor: 'black',
        precision: 2
      }
    };

    // chart.piecelabel.js

    // plugin (should probably put this somewhere else)
    Chart.pluginService.register({
      beforeDraw: chart => {
        if (chart.config.options.elements.center) {
          // Get ctx from string
          const ctx = chart.chart.ctx;

          // Get options from the center object in options
          const centerConfig = chart.config.options.elements.center;
          const fontStyle = centerConfig.fontStyle || 'Arial';
          const txt = centerConfig.text;
          const color = centerConfig.color || '#000';
          const sidePadding = centerConfig.sidePadding || 20;
          const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
          // Start with a base font of 30px
          ctx.font = '30px ' + fontStyle;

          // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          const stringWidth = ctx.measureText(txt).width;
          const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          const widthRatio = elementWidth / stringWidth;
          const newFontSize = Math.floor(30 * widthRatio);
          const elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          const fontSizeToUse = Math.min(newFontSize, elementHeight);

          // Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse + 'px ' + fontStyle;
          ctx.fillStyle = color;

          // Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });
  }

  ngOnInit() {
    this.update();
  }

  update() {
    setTimeout(() => this.chart.refresh(), 200);
  }

  hexToRgb(hex) {
    return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             , (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));
  }

}
