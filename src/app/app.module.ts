import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import 'chart.piecelabel.js';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { GitCommitGraphComponent } from './git-commit-graph/git-commit-graph.component';
import { CodeCommitTrendsGraphComponent } from './code-commit-trends-graph/code-commit-trends-graph.component';
import { MultiLineChartComponent } from './multi-line-chart/multi-line-chart.component';
import { CodeCoverageGraphComponent } from './code-coverage-graph/code-coverage-graph.component';
import { CodeViolationsGraphComponent } from './code-violations-graph/code-violations-graph.component';
import { AdvancedPieChartComponent } from './advanced-pie-chart/advanced-pie-chart.component';
import { CodeComplexityGraphComponent } from './code-complexity-graph/code-complexity-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    GitCommitGraphComponent,
    CodeCommitTrendsGraphComponent,
    MultiLineChartComponent,
    CodeCoverageGraphComponent,
    CodeViolationsGraphComponent,
    AdvancedPieChartComponent,
    CodeComplexityGraphComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
