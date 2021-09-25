export interface Comment {
  id?: string;
  authorId?: string;
  content?: string;
  likes?: number;
  dislikes?: number;
  dateCreated?: Date;

  postId?: string;
  parentId?: String;

  replays?: number;
  childs?: Comment[];

  //front-end
  childsHidden?: Boolean;
}
