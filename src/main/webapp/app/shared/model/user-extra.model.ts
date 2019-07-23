import { IPost } from 'app/shared/model/post.model';

export interface IUserExtra {
  id?: number;
  nickname?: string;
  name?: string;
  lastName?: string;
  status?: number;
  posts?: IPost[];
}

export class UserExtra implements IUserExtra {
  constructor(
    public id?: number,
    public nickname?: string,
    public name?: string,
    public lastName?: string,
    public status?: number,
    public posts?: IPost[]
  ) {}
}
