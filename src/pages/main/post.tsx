import React, { useEffect, useState } from 'react';
import { Post as IPost } from "./Main-page";
import { addDoc, getDocs, doc, collection, query, where, deleteDoc } from "firebase/firestore";
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props {
    post: IPost;
    removePostFromUI: (postId: string) => void; // Added prop
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const [user] = useAuthState(auth);
    const { post, removePostFromUI } = props; // Destructure prop

    const [likes, setlikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");

    const likesdoc = query(likesRef, where("postId", "==", post.id));

    const getlikes = async () => {
        const data = await getDocs(likesdoc);
        setlikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    };

    const hasuserliked = likes?.find((like) => like.userId === user?.uid);

    const addlike = async () => {
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
            if (user) {
                setlikes((prev) =>
                    prev
                        ? [...prev, { userId: user.uid, likeId: newDoc.id }]
                        : [{ userId: user.uid, likeId: newDoc.id }]
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const removelike = async () => {
        try {
            const liketodeletequery = query(
                likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid)
            );

            const liketodeletedata = await getDocs(liketodeletequery);

            const likeId = liketodeletedata.docs[0].id;

            const liketodelete = doc(db, "likes", likeId);
            await deleteDoc(liketodelete);
            if (user) {
                setlikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deletePost = async () => {
        try {
            if (user?.uid === post.userId) {
                const postDoc = doc(db, "posts", post.id);
                await deleteDoc(postDoc);
                // Optionally, remove likes associated with the post
                const likesToDeleteQuery = query(
                    likesRef,
                    where("postId", "==", post.id)
                );
                const likesToDeleteData = await getDocs(likesToDeleteQuery);
                likesToDeleteData.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                });
                removePostFromUI(post.id); // Update UI after deleting post
            } else {
                alert("You are not authorized to delete this post.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getlikes();
    }, []);

    return (
        <div className='posts'>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            
            <div className="author">
                <p>-{post.username}</p>
            </div>

            <div className="footer">
                <button className='likebutton' onClick={hasuserliked ? removelike : addlike}>
                    {hasuserliked ? <>&#128078;</> : <>&#128077;</>}
                </button>
                {likes && <p> Likes: {likes?.length} </p>}
                <button className='deletebutton' onClick={deletePost}>Delete</button>
            </div>
        </div>
    );
};
