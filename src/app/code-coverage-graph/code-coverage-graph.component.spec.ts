import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeCoverageGraphComponent } from './code-coverage-graph.component';

describe('CodeCoverageGraphComponent', () => {
  let component: CodeCoverageGraphComponent;
  let fixture: ComponentFixture<CodeCoverageGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeCoverageGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeCoverageGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
