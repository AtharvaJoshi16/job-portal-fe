export interface CommentsProps {
  comments: Array<CommentProps>;
}

export interface CommentProps {
  _id: string;
  userName: string;
  likes: number;
  comment: string;
}
