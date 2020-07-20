import { Action } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED, RouterNavigatedPayload } from '@ngrx/router-store';

import { Observable, OperatorFunction } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { RouterStateUrl } from '../store/route/serializer';

export interface OfRouteExtras {
  queryParams?: string[];
  data?: string[];
  fragment?: boolean;
}

function intersection(a1: any[], a2: any[], eq?: (e1, e2) => boolean): any[] {
  return a1.filter(e1 => a2.some(e2 => typeof eq === 'function' ? eq(e1, e2) : e1 === e2));
}

export const ofRoute = (routes: string | string[], extras?: OfRouteExtras): OperatorFunction<Action, RouterStateUrl> => (
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

      const { routerState } = payload;

      const queryParamsKeys = Object.keys(routerState.queryParams);
      const dataKeys = Object.keys(routerState.data);

      const sourcesToCheck = [
        routes.includes(routerState.routeUrl),
        ...(extras?.queryParams?.length > 0 ? [intersection(extras.queryParams, queryParamsKeys).length > 0] : []),
        ...(extras?.data?.length > 0 ? [intersection(extras.data, dataKeys).length > 0] : []),
        ...(typeof extras?.fragment !== 'undefined' ? [extras.fragment] : [])
      ];

      const result = sourcesToCheck.filter(v => v);
      return result.length === sourcesToCheck.length;
    }),
    map(payload => payload.routerState),
  );
};
