export interface Post {
  id?: string;
  name?: string;
  authorId?: string;
  media?: string;
  content?: string;
  likes?: number;
  dislikes?: number;
  comments?: number;
  //front-end
  mediaHidden?: Boolean;
}
