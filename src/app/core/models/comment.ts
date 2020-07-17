import { EntityMetadata } from './serde';

export class Comment extends EntityMetadata<Comment> {
  title: string;
  text: string;
  tags: string[];

  get hasTags(): boolean {
    return !!this.tags ? this.tags.length > 0 : false;
  }
}
