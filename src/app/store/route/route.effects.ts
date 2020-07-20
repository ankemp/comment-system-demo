import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as RouterActions from './route.actions';

@Injectable()
export class RouteEffects {

  @Effect({ dispatch: false }) navigate$ = this.actions$.pipe(
    ofType(RouterActions.navigate),
    tap(({ commands, extras }) => {
      this.router.navigate(commands, extras);
    })
  );

  @Effect({ dispatch: false }) navigateBack$: Observable<Action> = this.actions$.pipe(
    ofType(RouterActions.back),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false }) navigateForward$: Observable<Action> = this.actions$.pipe(
    ofType(RouterActions.forward),
    tap(() => this.location.forward())
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly location: Location
  ) { }
}
