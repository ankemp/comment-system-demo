import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromComment from './comment.reducer';

export const getState = createFeatureSelector<fromComment.State>(
  fromComment.commentsFeatureKey
);
export const getAll = createSelector(getState, fromComment.selectAll);
export const getEntities = createSelector(getState, fromComment.selectEntities);
export const getFilters = createSelector(getState, fromComment.selectFilters);
export const getAllFiltered = createSelector(
  getAll,
  getFilters,
  (comments, filters) => {
    if (!filters) {
      return comments;
    }
    const { tags } = filters;
    if (tags.length === 0) {
      return comments;
    }
    return comments.filter((c) => {
      return c.tags.findIndex((t) => tags.includes(t)) !== -1;
    });
  }
);
export const getActiveEditId = createSelector(
  getState,
  fromComment.selectActiveEditId
);
export const getAllTags = createSelector(getAll, (comments) =>
  Array.from(new Set(comments.map((c) => c.tags).flat()).values())
);
