import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitCommitGraphComponent } from './git-commit-graph.component';

describe('GitCommitGraphComponent', () => {
  let component: GitCommitGraphComponent;
  let fixture: ComponentFixture<GitCommitGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitCommitGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitCommitGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
