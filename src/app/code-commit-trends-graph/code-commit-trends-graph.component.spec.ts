import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeCommitTrendsGraphComponent } from './code-commit-trends-graph.component';

describe('CodeCommitTrendsGraphComponent', () => {
  let component: CodeCommitTrendsGraphComponent;
  let fixture: ComponentFixture<CodeCommitTrendsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeCommitTrendsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeCommitTrendsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
