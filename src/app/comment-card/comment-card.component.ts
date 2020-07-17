import { Component, Input } from '@angular/core';

import { Comment } from 'src/app/core/models';
import { CommentFacade } from '../store/comment';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent {
  @Input() data: Comment;

  constructor(private readonly commentFacade: CommentFacade) {}

  toggleEdit(): void {
    this.commentFacade.toggleEdit(this.data.id);
  }

  delete(): void {
    this.commentFacade.delete(this.data.id);
  }
}
