import { NgModule } from '@angular/core';

import { NgLetDirective } from './ng-let-directive';

const exportedDirectives = [
  NgLetDirective
];

@NgModule({
  declarations: [
    ...exportedDirectives
  ],
  exports: [
    ...exportedDirectives
  ]
})
export class DirectivesModule { }
