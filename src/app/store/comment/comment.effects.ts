import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ofRoute } from 'src/app/operators';

import { CommentHttpProxy } from 'src/app/core/proxies';
import * as CommentActions from './comment.actions';

@Injectable()
export class CommentEffects {
  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.loadComments),
      switchMap((_) =>
        this.api.getAll().pipe(
          map((comments) => CommentActions.loadCommentsSuccess({ comments })),
          catchError((_) => of(CommentActions.loadCommentsFailure()))
        )
      )
    )
  );

  commentsRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofRoute('/comments'),
      map(_ => CommentActions.loadComments())
    )
  );

  constructor(private api: CommentHttpProxy, private actions$: Actions) { }
}
