import { CommentsProps } from "./Comments.model";
import Comment from "./Comment";
import "./Comments.scss";
import { IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
const Comments = ({ comments }: CommentsProps) => {
  return (
    <div className="comments">
      <p className="comments__heading">Comments...</p>
      <div className="comments__add-comment">
        <TextField
          id="add-comment-field"
          label="Add Comment..."
          variant="standard"
          size="small"
        />
        <IconButton color="info" size="small">
          <SendIcon fontSize="inherit" />
        </IconButton>
      </div>
      <div className="comments__wrapper">
        {comments?.map((comment) => (
          <Comment {...comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
