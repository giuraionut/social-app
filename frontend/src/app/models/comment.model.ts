import { Post } from "./post.model";
import { User } from "./user.model";

export interface Comment {
  id?: string;
  author?: User;
  content?: string;
  likes?: number;
  dislikes?: number;
  creationDate?: Date;

  post?: Post;
  parent?: Comment;

  replays?: number;
  childs?: Comment[];

  //front-end
  childsHidden?: Boolean;
}
