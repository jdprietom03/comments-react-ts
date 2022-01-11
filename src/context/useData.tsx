import { createContext, useContext, useState } from 'react';
import data from './../data.json';

interface ContextProps{
    comments?: CommentProps[];
    currentUser?: UserProps;
    addComment?: (comment: CommentProps) => void;
    deleteComment?: (id: number) => void;
    addReply?: (id:number, reply: ReplyProps) => void;
    deleteReply?: (idComment: number, idReply: number) => void;
    reactionComment?: (reaction: number, id: number) => void;
    reactionReply?: (reaction:number, idComment: number, idReply: number) => void;
    updateReply?: (content: string, idComment: number, idReply: number) => void;
}

const Context = createContext<ContextProps>({});

export const useData = () => useContext(Context);

export interface UserProps {
    image: {
        png: string;
        webp: string;
    };
    username: string;
}

export interface ReplyProps {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string;
    user: UserProps;
}

export interface CommentProps {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: UserProps;
    replies: ReplyProps[];
}

const ContextProvider:React.FC = ({ children }) => {
    
    const [ comments, setComments ] = useState<CommentProps[]>(data.comments);
    const [ currentUser, setCurrentUser ] = useState<UserProps>(data.currentUser);

    const addComment = ( comment:CommentProps ) => {
        setComments([
            ...comments, comment
        ])
    }

    const deleteComment = ( id:number ) => {
        setComments(
            comments => comments.filter( comment => comment.id !== id )
        )
    }

    const addReply = ( id:number, reply:ReplyProps ) => {
        comments.forEach(
            comment => {
                if(comment.id === id) comment.replies.push(reply)
            }
        )
    }

    const deleteReply = ( idComment:number, idReply:number ) => {
        comments.forEach(
            comment => {
                if(comment.id === idComment)
                    comment.replies = 
                        comment.replies.filter( reply => reply.id !== idReply )
            }
        )
    }

    const reactionComment = ( reaction: number, id: number ) => {
        comments.forEach(
            comment => {
                if(comment.id === id)
                    comment.score += reaction;
            }
        )
    }

    const reactionReply = ( reaction: number, idComment: number, idReply: number ) => {
        comments.forEach(
            comment => {
                if(comment.id === idComment)
                    comment.replies.forEach( reply => {
                        if(reply.id === idReply)
                            reply.score += reaction;
                    })
            }
        )
    }

    const updateReply = ( content: string, idComment: number, idReply: number ) => {
        comments.forEach(
            comment => {
                if(comment.id === idComment)
                    comment.replies.forEach( reply => {
                        if(reply.id === idReply)
                            reply.content = content;
                    })
            }
        )
    }

    const props:ContextProps = {
        comments,
        currentUser,
        addComment,
        deleteComment,
        addReply,
        deleteReply,
        reactionComment,
        reactionReply,
        updateReply
    };

    return (
        <Context.Provider value={props}>{children}</Context.Provider>
    )
}

export default ContextProvider;