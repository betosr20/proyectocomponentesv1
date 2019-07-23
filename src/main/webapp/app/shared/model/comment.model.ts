import { IPost } from 'app/shared/model/post.model';

export interface IComment {
  id?: number;
  comment?: string;
  timestamp?: string;
  post?: IPost;
}

export class Comment implements IComment {
  constructor(public id?: number, public comment?: string, public timestamp?: string, public post?: IPost) {}
}
