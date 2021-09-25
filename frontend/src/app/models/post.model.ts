export interface Post {
  id?: string;
  authorId?: string;
  content?: string;
  likes?: number;
  dislikes?: number;
  dateCreated?: Date;

  name?: string;
  media?: string;

  comments?: number;

  hidden?: Boolean;
  //front-end
  mediaHidden?: Boolean;
}
