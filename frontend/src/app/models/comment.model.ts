export interface Comment{
    id?: string;
    postId?: string;
    parentId?: String;
    authorId?: string;
    content?: string;
    likes?: number;
    dislikes?: number;
    replays?: number;
    childs?: Comment[];
    

    //front-end
    childsHidden?: Boolean;
}