import { IPost } from 'app/shared/model/post.model';

export interface IUserExtra {
  id?: number;
  nickname?: string;
  status?: number;
  userId?: number;
  posts?: IPost[];
}

export class UserExtra implements IUserExtra {
  constructor(public id?: number, public nickname?: string, public status?: number, public userId?: number, public posts?: IPost[]) {}
}
