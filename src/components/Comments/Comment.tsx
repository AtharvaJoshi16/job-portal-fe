import { IconButton } from "@mui/material";
import { CommentProps } from "./Comments.model";
import "./Comments.scss";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import { useState } from "react";

const Comment = ({ _id, comment, likes, userName }: CommentProps) => {
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

  return (
    <div className="comments__wrapper__main">
      <div className="comments__wrapper__comment">
        <p className="comments__wrapper__comment__username">{userName}</p>
        <p className="comments__wrapper__comment__comment">{comment}</p>
      </div>
      <div className="comments__wrapper__comment__likes">
        <IconButton size="small" color="info" onClick={handleLike}>
          {like ? (
            <ThumbUpAltRoundedIcon color="inherit" fontSize="inherit" />
          ) : (
            <ThumbUpAltOutlinedIcon color="inherit" fontSize="inherit" />
          )}
        </IconButton>
        <p className="comments__wrapper__comment__likes__text">{likes}</p>
      </div>
    </div>
  );
};

export default Comment;
