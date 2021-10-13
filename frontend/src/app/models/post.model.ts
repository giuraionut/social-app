import { Community } from "./community.model";
import { User } from "./user.model";

export interface Post {
  id?: string;
  op?: User;
  community?: Community;
  content?: string;
  likes?: number;
  dislikes?: number;
  dateCreated?: Date;

  title?: string;
  media?: string;

  comments?: number;

  visible?: boolean;
  //front-end
  mediaHidden?: boolean;
}
