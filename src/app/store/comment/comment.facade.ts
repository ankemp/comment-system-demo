import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as CommentActions from './comment.actions';
import * as RouterActions from '../route/route.actions';
import * as query from './comment.selectors';
import { Comment } from 'src/app/core/models';

@Injectable()
export class CommentFacade {
  list$ = this.store.pipe(select(query.getAllFiltered));
  activeEditId$ = this.store.pipe(select(query.getActiveEditId));
  filters$ = this.store.pipe(select(query.getFilters));
  tags$ = this.store.pipe(select(query.getAllTags));

  constructor(private readonly store: Store) { }

  getAll(): void {
    this.store.dispatch(CommentActions.loadComments());
  }

  filter(filters): void {
    this.store.dispatch(RouterActions.navigate({ commands: [''], extras: { queryParams: { tags: filters.tags } } }));
  }

  toggleEdit(id: number): void {
    this.store.dispatch(CommentActions.setCommentEditMode({ id }));
  }

  add(comment: Partial<Comment>): void {
    this.store.dispatch(CommentActions.addComment({ comment }));
  }

  edit(comment: Comment): void {
    this.store.dispatch(
      CommentActions.updateComment({
        comment: { id: comment.id, changes: comment },
      })
    );
  }

  delete(id: number): void {
    this.store.dispatch(CommentActions.deleteComment({ id }));
  }
}
