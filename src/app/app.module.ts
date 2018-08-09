import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart';

import { AppComponent } from './app.component';
import { GitCommitGraphComponent } from './git-commit-graph/git-commit-graph.component';
import { CodeCommitTrendsGraphComponent } from './code-commit-trends-graph/code-commit-trends-graph.component';
import { MultiLineChartComponent } from './multi-line-chart/multi-line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    GitCommitGraphComponent,
    CodeCommitTrendsGraphComponent,
    MultiLineChartComponent
  ],
  imports: [
    BrowserModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
