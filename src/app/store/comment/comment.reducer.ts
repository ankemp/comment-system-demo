import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Comment } from 'src/app/core/models';
import * as CommentActions from './comment.actions';

export const commentsFeatureKey = 'comments';

export interface State extends EntityState<Comment> {
  activeEditId: number;
  filters: {
    tags: string[];
  };
}

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>();

export const initialState: State = adapter.getInitialState({
  activeEditId: undefined,
  filters: {
    tags: [],
  },
});

export const reducer = createReducer(
  initialState,
  on(CommentActions.setCommentEditMode, (state, action) => ({
    ...state,
    activeEditId: action.id,
  })),

  on(CommentActions.filterComments, (state, action) => ({
    ...state,
    filters: action.filters,
  })),

  on(CommentActions.addComment, (state, action) => {
    const newComment = {
      ...action.comment,
      id: Object.keys(state.entities).length + 1,
    } as Comment;
    return adapter.addOne(newComment, state);
  }),

  on(CommentActions.upsertComment, (state, action) =>
    adapter.upsertOne(action.comment, state)
  ),

  on(CommentActions.updateComment, (state, action) => ({
    ...adapter.updateOne(action.comment, state),
    activeEditId: undefined,
  })),

  on(CommentActions.deleteComment, (state, action) =>
    adapter.removeOne(action.id, state)
  ),

  on(CommentActions.loadCommentsSuccess, (state, action) =>
    adapter.setAll(action.comments, state)
  )

);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
export const selectActiveEditId = (state: State) => state.activeEditId;
export const selectFilters = (state: State) => state.filters;
