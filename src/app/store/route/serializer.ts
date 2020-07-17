import { RouterStateSnapshot, Params } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  routeUrl: string;
  params: Params;
  queryParams: Params;
  segmentedUrl: string[];
}

export class RouteSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }
    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;
    const routeUrl = Object.entries(params).reduce((acc, [key, value]) => `${acc}${url.replace(value, `:${key}`)}`, url);
    const segmentedUrl = route.url.map(x => x.path);

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { ...routerState.root, url, routeUrl, params, queryParams, segmentedUrl };
  }
}
