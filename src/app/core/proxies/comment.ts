import { Injectable } from '@angular/core';

import { Comment } from '../models';
import { HttpDataProxy } from './http-proxy-base';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CommentHttpProxy extends HttpDataProxy<Comment> {
  baseUri = '/api/comment';

  constructor(http: HttpClient) {
    super(Comment, http);
  }
}
