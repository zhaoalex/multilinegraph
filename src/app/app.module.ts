import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { GitCommitGraphComponent } from './git-commit-graph/git-commit-graph.component';
import { CodeCommitTrendsGraphComponent } from './code-commit-trends-graph/code-commit-trends-graph.component';
import { MultiLineChartComponent } from './multi-line-chart/multi-line-chart.component';
import { CodeCoverageGraphComponent } from './code-coverage-graph/code-coverage-graph.component';
import { WtfComponent } from './wtf/wtf.component';

@NgModule({
  declarations: [
    AppComponent,
    GitCommitGraphComponent,
    CodeCommitTrendsGraphComponent,
    MultiLineChartComponent,
    CodeCoverageGraphComponent,
    WtfComponent
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
