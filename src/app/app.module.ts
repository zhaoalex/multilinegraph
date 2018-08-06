import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart';

import { AppComponent } from './app.component';
import { GitCommitGraphComponent } from './git-commit-graph/git-commit-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    GitCommitGraphComponent
  ],
  imports: [
    BrowserModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
