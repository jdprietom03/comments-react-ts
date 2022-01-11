import PostCreator from "../PostCreator/PostCreator";
import { useData } from "./../../context/useData";
import Comment from "./Comment";
import style from "./styles.module.css";

function Comments() {
  const { comments, addComment, currentUser } = useData();
  
    const createComment = (content: string) => {
        const comment = {
            id: Math.round(Math.random() * 1000000),
            user: currentUser || {
                username: "",
                image: {
                  png: "",
                  webp: "",
                },
            },
            createdAt: "some minutes ago",
            replies: [],
            content: content,
            score: 0
        }
        addComment && addComment(comment)
    }

  return (
    <div className={style.comments}>
        {comments?.map((comment) => (
            <Comment {...comment} key={comment.id} />
        ))}
        <div className={style.newComment}>
            <PostCreator createPost={createComment} photo={currentUser?.image.png} />
        </div>
    </div>
  );
}

export default Comments;
