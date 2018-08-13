import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeComplexityGraphComponent } from './code-complexity-graph.component';

describe('CodeComplexityGraphComponent', () => {
  let component: CodeComplexityGraphComponent;
  let fixture: ComponentFixture<CodeComplexityGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeComplexityGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeComplexityGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
