import { NgModule } from '@angular/core';

import { JoinPipe } from './join.pipe';
import { SafeHTMLPipe } from './safehtml.pipe';

const exportedPipes = [
  JoinPipe,
  SafeHTMLPipe
];

@NgModule({
  declarations: [
    ...exportedPipes,
  ],
  providers: [
    ...exportedPipes
  ],
  exports: [
    ...exportedPipes
  ]
})
export class PipesModule { }
