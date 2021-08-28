export interface Post {
  id?: string;
  name?: string;
  authorId?: string;
  media?: string;
  content?: string;

  //front-end
  mediaHidden?: Boolean;
}
