import { IUserExtra } from 'app/shared/model/user-extra.model';
import { IComment } from 'app/shared/model/comment.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IPost {
  id?: number;
  tittle?: string;
  text?: string;
  status?: string;
  timestamp?: string;
  userExtra?: IUserExtra;
  comments?: IComment[];
  tags?: ITag[];
}

export class Post implements IPost {
  constructor(
    public id?: number,
    public tittle?: string,
    public text?: string,
    public status?: string,
    public timestamp?: string,
    public userExtra?: IUserExtra,
    public comments?: IComment[],
    public tags?: ITag[]
  ) {}
}
