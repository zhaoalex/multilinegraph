import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeViolationsGraphComponent } from './code-violations-graph.component';

describe('CodeViolationsGraphComponent', () => {
  let component: CodeViolationsGraphComponent;
  let fixture: ComponentFixture<CodeViolationsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeViolationsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeViolationsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
