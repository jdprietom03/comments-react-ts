import { useState, useCallback } from "react";
import { ReplyProps, useData } from "./../../context/useData";
import Reply from "./Reply";
import EditableReply from "./EditableReply";
import PostCreator from "../PostCreator/PostCreator";
import style from "./styles.module.css";

const Replies: React.FC<{
  replies: ReplyProps[];
  idComment: number;
  replyingTo: string;
  createReply: (content:string) => void;
  adding?: boolean;
  handleAddReply?: (replyingTo?: string) => void;
  handleDelete: (id:number) => void;
}> = ({ replies, idComment, replyingTo, createReply, handleAddReply, adding, handleDelete }) => {

  const { currentUser, deleteReply } = useData();

  const handleDeleteReply = useCallback((id: number) => {
    deleteReply && deleteReply(idComment, id);
    handleDelete(id)
  }, []);

  return (
    <div className={style.replies}>
      <div className={style.repliesContainer}>
        {replies?.map((reply) =>
          reply.user.username !== currentUser?.username ? (
            <Reply
              {...reply}
              key={reply.id}
              idComment={idComment}
              addReply={handleAddReply}
            />
          ) : (
            <EditableReply
              {...reply}
              key={reply.id}
              idComment={idComment}
              deleteReply={handleDeleteReply}
            />
          )
        )}
        {adding && <PostCreator createPost={createReply} replyingTo={replyingTo} photo={currentUser?.image.png}/>}
      </div>
    </div>
  );
};

export default Replies;
