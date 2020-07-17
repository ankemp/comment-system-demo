import { Action } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED, RouterNavigatedPayload } from '@ngrx/router-store';

import { Observable, OperatorFunction } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { RouterStateUrl } from '../store/route/serializer';

export const ofRoute = (routes: string | string[]): OperatorFunction<Action, RouterStateUrl> => (
  source$: Observable<Action>,
): Observable<RouterStateUrl> => {
  if (!Array.isArray(routes)) {
    // tslint:disable-next-line: no-parameter-reassignment
    routes = [routes];
  }
  return source$.pipe(
    ofType(ROUTER_NAVIGATED),
    map(({ payload }: { payload: RouterNavigatedPayload<RouterStateUrl> }) => payload),
    distinctUntilChanged(),
    filter(payload => {
      if (typeof payload === 'undefined') {
        return false;
      }

      return routes.includes(payload.routerState.routeUrl);
    }),
    map(payload => payload.routerState),
  );
};
