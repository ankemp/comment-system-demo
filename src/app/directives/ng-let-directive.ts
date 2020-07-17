import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

export class NgLetContext {
  $implicit: any = undefined;
  ngLet: any = undefined;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngLet]'
})
export class NgLetDirective implements OnInit {
  private readonly _context = new NgLetContext();

  @Input()
  set ngLet(value: any) {
    this._context.$implicit = this._context.ngLet = value;
  }

  constructor(
    private readonly _vcr: ViewContainerRef,
    private readonly _templateRef: TemplateRef<NgLetContext>
  ) { }

  ngOnInit(): void {
    this._vcr.createEmbeddedView(this._templateRef, this._context);
  }
}