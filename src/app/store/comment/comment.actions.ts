import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Comment } from 'src/app/core/models';

export const loadComments = createAction('[Comment/API] Load Comments');

export const loadCommentsSuccess = createAction(
  '[Comment/API] Load Comments Success',
  props<{ comments: Comment[] }>()
);

export const loadCommentsFailure = createAction(
  '[Comment/API] Load Comments Failure'
);

export const setCommentEditMode = createAction(
  '[Comment] Set Comment Edit Mode',
  props<{ id: number }>()
);

export const addComment = createAction(
  '[Comment/API] Add Comment',
  props<{ comment: Partial<Comment> }>()
);

export const upsertComment = createAction(
  '[Comment/API] Upsert Comment',
  props<{ comment: Comment }>()
);

export const updateComment = createAction(
  '[Comment/API] Update Comment',
  props<{ comment: Update<Comment> }>()
);

export const deleteComment = createAction(
  '[Comment/API] Delete Comment',
  props<{ id: number }>()
);

export const filterComments = createAction(
  '[Comment] Filter Comments',
  props<{ filters: { tags: string[] } }>()
);
