import { Community } from './community.model';
import { PostMedia } from './post-media.model';
import { User } from './user.model';

export interface Post {
  id?: string;
  op?: User;
  community?: Community;
  content?: string;
  creationDate?: Date;

  title?: string;
  postMedia?: PostMedia;

  comments?: number;

  visible?: boolean;
  //front-end
  mediaHidden?: boolean;
  likes?: number;
}
