import { useState } from "react";
import { ReplyProps } from "./../../context/useData";
import ReplyIcon from "./../Icons/Reply";
import Like from "./../Icons/Like";
import Dislike from "../Icons/Dislike";
import style from "./styles.module.css";

import { useData } from "./../../context/useData";

const NO_LIKED = 0;
const LIKED = 1;
const DISLIKED = 2;

const Reply: React.FC<
  ReplyProps & { idComment: number; addReply?: (replyingTo?: string) => void }
> = ({
  id,
  content,
  createdAt,
  score,
  user,
  replyingTo,
  idComment,
  addReply,
}) => {
  const { reactionReply } = useData();
  const [likes, setScore] = useState(score);
  const [liked, setLiked] = useState(NO_LIKED);

  const handleLike = () => {
    if (liked !== LIKED) {
      reactionReply && reactionReply(1, idComment, id);
      setScore((likes) => likes + 1);
      setLiked(LIKED);
    }
  };

  const handleDislike = () => {
    if (liked !== DISLIKED) {
      reactionReply && reactionReply(-1, idComment, id);
      setScore((likes) => likes - 1);
      setLiked(DISLIKED);
    }
  };

  const handleReply = (replyingTo?: string) =>{ 
       addReply && addReply(replyingTo);
  }

  return (
    <div className={style.reply}>
      <div className={style.wrapper}>
        <div className={style.reactions}>
          <a onClick={handleLike} className={liked === 1 ? style.marked : ""}>
            <Like />
          </a>
          {likes}
          <a onClick={handleDislike} className={liked === 2 ? style.marked : ""}>
            <Dislike />
          </a>
        </div>
        <div className={style.replyContainer}>
          <div className={style.header}>
            <div className={style.information}>
              <div className={style.userPhoto}>
                <img alt={`user-${user.username}`} src={user.image.png} />
              </div>
              <div className={style.username}>{user.username}</div>
              <div className={style.date}>{createdAt}</div>
            </div>
            <div className={style.action}>
              <a onClick={() => handleReply(user.username)}>
                <ReplyIcon />
                reply
              </a>
            </div>
          </div>
          <div className={style.content}>
            <span className={style.mention}>@{replyingTo} &nbsp;</span>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
