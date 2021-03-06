import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

@Component({
  selector: 'app-code-coverage-graph',
  templateUrl: './code-coverage-graph.component.html',
  styleUrls: ['./code-coverage-graph.component.css']
})
export class CodeCoverageGraphComponent implements OnInit {
  dataset = [
    { label: 'Success', count: 450 },
    { label: 'Failure', count: 20 },
    { label: 'Skipped', count: 4 },
    { label: 'Error', count: 1 }
  ];

  // size options
  margin = { top: 10, right: 10, bottom: 10, left: 10 };
  width = 500 - this.margin.left - this.margin.right;
  height = 500 - this.margin.top - this.margin.bottom;
  radius = Math.min(this.width, this.height) / 2;

  // donut options
  donutWidth = 50; // 50 pixels
  padAngle = 0.01; // whitespace between arcs
  labelArcDist = 15;
  // todo: change color on hover hoverArcDist = 2;

  // legend options
  legendRectSize = 18;
  legendSpacing = 4;

  sum: any;
  color: any;
  tip: any;


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

    // const tip = d3Tip()
    //   .attr('class', 'd3-tip')
    //   .html(d => 'blah');

    const svg = d3.select('.code-coverage-graph')
    .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
    .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    // .call(this.tip);

    svg.append('g').attr('class', 'slices');
    svg.append('g').attr('class', 'labels');
    svg.append('g').attr('class', 'lines');

  const arc = d3.arc()
    .innerRadius(this.radius - this.donutWidth)
    .outerRadius(this.radius);

  const labelArc = d3.arc()
    .outerRadius(this.radius + this.labelArcDist)
    .innerRadius(this.radius + this.labelArcDist);

  // const hoverArc = d3.arc()
  //   .outerRadius(this.radius + this.hoverArcDist)
  //   .innerRadius(this.radius + this.hoverArcDist);

  const pie = d3.pie()
    .value(d => d.count)
    // .sort(null)
    .padAngle(this.padAngle);

  const slices = svg.select('.slices')
    .selectAll('path')
    .data(pie(this.dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => {
      return this.color(d.data.label);
    });
    // .style('fill-opacity', '0.85');

  // const labels = svg.select('.labels')
  //   .selectAll('text')
  //   .data(pie(this.dataset))
  //   .enter()
  //   .append('text')
  //   .text(d => {
  //     return d.data.label + ': ' + Math.round(10000 * d.data.count / sum) / 100 + '%';
  //   })
  //   .attr('dy', '0.35em')
  //   .attr('transform', (d, i) => {
  //     const cent = labelArc.centroid(d);
  //     cent[0] = this.radius * 0.95 * ((this.midAngle(d) < Math.PI) ? 1 : -1);
  //     const percent = (d.endAngle - d.startAngle) / (2 * Math.PI) * 100;
  //     if (percent < 3) {
  //       cent[1] -= i * 15;
  //     }
  //     return 'translate(' + cent + ')';
  //   })
  //   .style('text-anchor', d => {
  //     return (this.midAngle(d) < Math.PI) ? 'start' : 'end';
  //   });

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

  // // slices.call(tip);

  // const polyline = svg.select('.lines')
  //   .selectAll('polyline')
  //   .data(pie(this.dataset))
  //   .enter()
  //   .append('polyline')
  //   .attr('points', (d, i) => {
  //     const pos = labelArc.centroid(d);
  //     pos[0] = this.radius * 0.95 * ((this.midAngle(d) < Math.PI) ? 1 : -1);
  //     // let o = labelArc.centroid(d)
  //     const percent = (d.endAngle - d.startAngle) / (2 * Math.PI) * 100;
  //     if (percent < 3) {
  //       pos[1] -= i * 15;
  //     }
  //     return [arc.centroid(d), labelArc.centroid(d), pos];
  //   })
  //   .style('fill', 'none')
  //   .attr('stroke', d => this.color(d.data.label))
  //   .style('stroke-width', '1.5px');


  // slices.on('mouseover', d => {
  //   console.log('mouse on ' + d.data.label);
  //   // tip.show(d);
  //   // probably want something like a tooltip, other sections fade, moveover section creates a shadow, maybe expands outwards a little?
  // });

  // /* slices.on('mousemove', d => {
  //   console.log('mouse move');
  //   tip.html(d => {

  //   })
  // }) */

  // slices.on('mouseout', d => {
  //   console.log('mouse off ' + d.data.label);
  //   // tip.hide(d);
  // });


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
