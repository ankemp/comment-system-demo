import { Component, OnInit } from '@angular/core';

import { CommentFacade } from '../store/comment';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  list$ = this.commentFacade.list$.pipe(
    tap(d => console.log('comments: ', d))
  );
  activeEditId$ = this.commentFacade.activeEditId$;

  constructor(
    private readonly commentFacade: CommentFacade
  ) { }

  ngOnInit(): void {
  }

}
