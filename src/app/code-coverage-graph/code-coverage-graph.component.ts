import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

@Component({
  selector: 'app-code-coverage-graph',
  templateUrl: './code-coverage-graph.component.html',
  styleUrls: ['./code-coverage-graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CodeCoverageGraphComponent implements OnInit {
  dataset = [
    { label: 'Unit Test Success', count: 450 },
    { label: 'Unit Test Failure', count: 20 },
    { label: 'Unit Test Skipped', count: 4 },
    { label: 'Unit Test Error', count: 1 }
  ];

  // size options
  margin = { top: 10, right: 10, bottom: 10, left: 10 };
  width = 500 - this.margin.left - this.margin.right;
  height = 500 - this.margin.top - this.margin.bottom;
  radius = Math.min(this.width, this.height) / 4;

  // donut options
  donutWidth = 50; // 50 pixels
  padAngle = 0.001; // whitespace between arcs
  labelArcDist = 15;

  // legend options
  legendRectSize = 18;
  legendSpacing = 4;

  sum: any;
  color: any;


  constructor() {
    this.color = d3.scaleOrdinal(d3.schemeCategory10);

  }

  midAngle(d: any): number {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  ngOnInit() {
    this.redraw();
  }

  redraw() {
    const sum = d3.sum(this.dataset.map(d => d.count));

    const tip = d3Tip()
      .attr('class', 'd3-tip')
      .html(d => `${d.data.label}: ${d.data.count}`);

    const svg = d3.select('.code-coverage-graph')
    .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
    .append('g')
      .attr('transform', `translate(${this.radius * 2}, ${this.radius * 2})`)
    .call(tip);

    svg.append('g').attr('class', 'slices');
    svg.append('g').attr('class', 'labels');
    svg.append('g').attr('class', 'lines');

    const arc = d3.arc()
      .innerRadius(this.radius - this.donutWidth)
      .outerRadius(this.radius);

    const labelArc = d3.arc()
      .outerRadius(this.radius + this.labelArcDist)
      .innerRadius(this.radius + this.labelArcDist);

    const pie = d3.pie()
      .value(d => d.count)
      // .sort(null)
      .padAngle(this.padAngle);

    // create donut slices
    const slices = svg.select('.slices')
      .selectAll('path')
      .data(pie(this.dataset))
      .enter().append('path')
      .attr('d', arc)
      .attr('fill', d => this.color(d.data.label))
      .style('fill-opacity', '0.85');

    // create text labels
    const labels = svg.select('.labels')
      .selectAll('text')
      .data(pie(this.dataset))
      .enter().append('text')
      .text(d => `${d.data.label}: ${Math.round(10000 * d.data.count / sum) / 100}%`)
      .attr('dy', '0.35em')
      .attr('transform', (d, i) => {
        const cent = labelArc.centroid(d);
        cent[0] = this.radius * 0.95 * ((this.midAngle(d) < Math.PI) ? 1 : -1);
        // if area too small, move label to avoid overlap
        const percent = (d.endAngle - d.startAngle) / (2 * Math.PI) * 100;
        if (percent < 3) {
          cent[1] += i * 15;
        }
        return `translate(${cent})`;
      })
      .style('text-anchor', d => (this.midAngle(d) < Math.PI) ? 'start' : 'end');

  // // labels inside chart
  // /*
  //   .each((d, i, nodes) => {
  //     var centroid = arc.centroid(d);
  //     d3.select(nodes[i])
  //       .attr('x', centroid[0])
  //       .attr('y', centroid[1])
  //       .attr('dy', '0.33em')
  //       //.text(Math.round(10000 * d.data.count / sum) / 100 + '%');
  //   })*/

    // create lines connecting chart to text
    const lines = svg.select('.lines')
      .selectAll('polyline')
      .data(pie(this.dataset))
      .enter()
      .append('polyline')
      .attr('points', (d, i) => {
        const pos = labelArc.centroid(d);
        pos[0] = this.radius * 0.95 * ((this.midAngle(d) < Math.PI) ? 1 : -1);
        // if area too small, move label to avoid overlap
        const percent = (d.endAngle - d.startAngle) / (2 * Math.PI) * 100;
        if (percent < 3) {
          pos[1] += i * 15;
        }
        return [arc.centroid(d), labelArc.centroid(d), pos];
      })
      .style('fill', 'none')
      .attr('stroke', d => this.color(d.data.label))
      .style('stroke-width', '1.5px');

    // mouse listeners
    slices.on('mouseover', (d, i, nodes) => {
      d3.select(nodes[i])
        .style('fill-opacity', '1.0'); // makes the slice darker in color
      tip.show(d, nodes[i]);
    });

    slices.on('mouseout', (d, i, nodes) => {
      d3.select(nodes[i])
        .style('fill-opacity', '0.85');
      tip.hide(d, nodes[i]);
    });

  // create text in middle of chart
  const midText = svg.append('text')
    .attr('text-anchor', 'middle')
    .text(`Total: ${sum}`)
    .style('font-size', '1.5em');


  // /*
  // var legend = svg.selectAll('.legend')
  //   .data(color.domain())
  //   .enter()
  //   .append('g')
  //   .attr('class', 'legend')
  //   .attr('transform', (d, i) => {
  //     var height = legendRectSize + legendSpacing;
  //     var offset = height * color.domain().length / 2;
  //     var horiz = -2 * legendRectSize;
  //     var vert = i * height - offset;
  //     return 'translate(' + horiz + ', ' + vert + ')';
  //   })

  // legend.append('rect')
  //   .attr('width', legendRectSize)
  //   .attr('height', legendRectSize)
  //   .style('fill', color)
  //   .style('stroke', color)

  // legend.append('text')
  //   .attr('x', legendRectSize + legendSpacing)
  //   .attr('y', legendRectSize - legendSpacing)
  //   .text(d => { return d; });
  //   */


  }

}
