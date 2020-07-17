import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { commentsFeatureKey, reducer } from './comment.reducer';
import { CommentEffects } from './comment.effects';
import { CommentFacade } from './comment.facade';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature(commentsFeatureKey, reducer),
    EffectsModule.forFeature([CommentEffects]),
  ],
  providers: [CommentFacade],
})
export class CommentStoreModule {}
