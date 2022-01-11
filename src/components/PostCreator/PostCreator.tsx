import { useState, useRef } from "react";
import style from "./styles.module.css";

const PostCreator: React.FC<{
  text?: string;
  replyingTo?: string;
  createPost?: (content: string) => void;
  photo?: string;
}> = ({ text, replyingTo, createPost, photo }) => {
  const editor = useRef<HTMLTextAreaElement | null>(null);

  const handleSend = () =>{
    createPost && createPost(editor?.current?.value || "");
      if(editor.current)
       editor.current.value = "";
  }

  const handleEnter = (event: any) => {
    if (event.keyCode === 13) handleSend();
  };

  return (
    <div className={style.postCreator}>
      <div className={style.userPhoto}>
        <div className={style.imgContainer}>
            <img alt="user-photo" src={photo} />
        </div>
      </div>
      <div className={style.contentEditable}>
        <textarea
          title="reply"
          defaultValue={replyingTo ? `@${replyingTo} ` : ""}
          ref={editor}
          onKeyDown={handleEnter}
        ></textarea>
        <div className={style.button}>
          <button type="button" onClick={handleSend}>
            {text ? text : "SEND"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
