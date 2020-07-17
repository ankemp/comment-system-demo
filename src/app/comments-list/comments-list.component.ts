import { Component, OnInit } from '@angular/core';

import { CommentFacade } from '../store/comment';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  list$ = this.commentFacade.list$;
  activeEditId$ = this.commentFacade.activeEditId$;

  constructor(
    private readonly commentFacade: CommentFacade
  ) { }

  ngOnInit(): void {
    // load comments, typically would do this with an effect watching the route,
    // but for simplicity I'm just calling it here.
    this.commentFacade.getAll();
  }

}
