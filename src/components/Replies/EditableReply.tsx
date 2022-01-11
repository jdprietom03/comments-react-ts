import { useState, useRef } from "react";
import { ReplyProps } from "../../context/useData";
import EditIcon from "../Icons/Edit";
import DeleteIcon from "../Icons/Delete";
import Like from "../Icons/Like";
import Dislike from "../Icons/Dislike";
import style from "./styles.module.css";

import { useData } from "../../context/useData";

const NO_LIKED = 0;
const LIKED = 1;
const DISLIKED = 2;

const EditableReply: React.FC<
  ReplyProps & { idComment: number; deleteReply: (id: number) => void }
> = ({
  id,
  content,
  createdAt,
  score,
  user,
  replyingTo,
  idComment,
  deleteReply,
}) => {
  const { reactionReply, updateReply } = useData();
  const [likes, setScore] = useState(score);
  const [value, setValue] = useState(content);
  const [editing, setEditing] = useState(false);
  const [liked, setLiked] = useState(NO_LIKED);

  const editor = useRef<HTMLTextAreaElement | null>(null);

  const handleLike = () => {
    if(liked != LIKED){
      reactionReply && reactionReply(1, idComment, id);
      setScore((likes) => likes + 1);
      setLiked(LIKED);
    }
  };

  const handleDislike = () => {
    if(liked != DISLIKED){
      reactionReply && reactionReply(-1, idComment, id);
      setScore((likes) => likes - 1);
      setLiked(DISLIKED);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = () => {
    const content = editor.current?.value.slice(replyingTo.length + 2) || "";
    updateReply && updateReply(content, idComment, id);
    setEditing(false);
    setValue(content);
  };

  const handleEnter = (event: any) => {
    if (event.keyCode === 13) handleUpdate();
  };

  const handleDelete = () => {
    deleteReply(id);
  };

  return (
    <div className={style.replyArea}>
      <div className={style.reply}>
        <div className={style.wrapper}>
          <div className={style.reactions}>
            <a onClick={handleLike} className={liked == 1 ? style.marked:""}>
              <Like />
            </a>
            {likes}
            <a onClick={handleDislike} className={liked == 2 ? style.marked : ""}>
              <Dislike />
            </a>
          </div>
          <div className={style.replyContainer}>
            <div className={style.header}>
              <div className={style.information}>
                <div className={style.userPhoto}>
                  <img alt={`user-${user.username}`} src={user.image.png} />
                </div>
                <div className={style.username}>
                  {user.username} <span className={style.tag}> You </span>{" "}
                </div>
                <div className={style.date}>{createdAt}</div>
              </div>
              <div className={style.actionsUser}>
                <a onClick={handleDelete} className={style.delete}>
                  <DeleteIcon />
                  Delete
                </a>
                <a onClick={handleEdit} className={style.edit}>
                  <EditIcon />
                  Edit
                </a>
              </div>
            </div>
            {!editing && (
              <div className={style.content}>
                <span className={style.mention}>@{replyingTo} &nbsp;</span>
                {value}
              </div>
            )}
            {editing && (
              <div className={style.contentEditable}>
                <textarea
                  title="reply"
                  defaultValue={`@${replyingTo} ${value}`}
                  ref={editor}
                  onKeyDown={handleEnter}
                ></textarea>
                <div className={style.button}>
                  <button type="button" onClick={handleUpdate}>
                    UPDATE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableReply;
