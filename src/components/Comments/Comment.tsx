import { useState } from "react";
import { CommentProps, ReplyProps } from "./../../context/useData";
import ReplyIcon from "./../Icons/Reply";
import Like from "./../Icons/Like";
import Dislike from "../Icons/Dislike";
import style from "./styles.module.css";
import Replies from "../Replies/Replies";

import { useData } from "./../../context/useData";

const NO_LIKED = 0;
const LIKED = 1;
const DISLIKED = 2;

const Comment: React.FC<CommentProps> = ({
  id,
  content,
  createdAt,
  score,
  user,
  replies: data,
}) => {
  const { reactionComment, addReply, currentUser } = useData();
  const [likes, setScore] = useState(score);
  const [liked, setLiked] = useState(NO_LIKED);
  const [replies, setReplies] = useState(data);
  const [adding, setAdding] = useState(false);
  const [replyingTo, setReplying] = useState(user.username);

  const handleLike = () => {
    if (liked !== LIKED) {
      reactionComment && reactionComment(1, id);
      setScore((likes) => likes + 1);
      setLiked(LIKED);
    }
  };

  const handleDislike = () => {
    if (liked !== DISLIKED) {
      reactionComment && reactionComment(-1, id);
      setScore((likes) => likes - 1);
      setLiked(DISLIKED);
    }
  };

  const handleAddReply = (replyingTo?: string) => {
    setAdding(true);
    setReplying(replyingTo || user.username);
  };

  const createReply = (content: string) => {
    setAdding(false);
    const reply = {
      id: Math.round(Math.random() * 1000000),
      replyingTo: replyingTo,
      content: content.slice(replyingTo.length + 2),
      score: 0,
      user: currentUser || {
        username: "",
        image: {
          png: "",
          webp: "",
        },
      },
      createdAt: "some minutes ago",
    };

    addReply && addReply(id, reply);
    setReplies([
        ...replies,
        reply
    ])
  };
  
  const handleDelete = (id:number)  => {
    setReplies((replies) => replies.filter((reply) => reply.id !== id));
  }

  return (
    <div className={style.commentArea}>
      <div className={style.comment}>
        <div className={style.wrapper}>
          <div className={style.reactions}>
            <a onClick={handleLike} className={liked == 1 ? style.marked : ""}>
              <Like />
            </a>
            {likes}
            <a
              onClick={handleDislike}
              className={liked == 2 ? style.marked : ""}
            >
              <Dislike />
            </a>
          </div>
          <div className={style.commentContainer}>
            <div className={style.header}>
              <div className={style.information}>
                <div className={style.userPhoto}>
                  <img alt={`user-${user.username}`} src={user.image.png} />
                </div>
                <div className={style.username}>{user.username}</div>
                <div className={style.date}>{createdAt}</div>
              </div>
              <div className={style.action}>
                <a onClick={() => handleAddReply(user.username)}>
                  <ReplyIcon/>
                  reply
                </a>
              </div>
            </div>
            <div className={style.content}>{content}</div>
          </div>
        </div>
      </div>
      {replies.length > 0 && (
        <Replies
          replies={replies}
          idComment={id}
          replyingTo={replyingTo}
          createReply={createReply}
          handleAddReply={handleAddReply}
          adding={adding}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Comment;
