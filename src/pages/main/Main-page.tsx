import React, { useEffect, useState } from 'react';
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Post as PostComponent } from './post';

export interface Post {
  id: string,
  userId: string,
  title: string,
  username: string,
  description: string,
}

export const HomePage = () => {
  const [postlist, setpostlist] = useState<Post[] | null>(null);
  const postRef = collection(db, "posts");

  const getpost = async () => {
    const data = await getDocs(postRef);
    setpostlist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
  };

  useEffect(() => {
    getpost()
  }, []);

  // Function to remove post from UI
  const removePostFromUI = (postId: string) => {
    setpostlist((prevPosts) => prevPosts?.filter((post) => post.id !== postId) || null);
  };

  return (
    <div className='post-lists'>
      {postlist?.map((post) => (
        <PostComponent key={post.id} post={post} removePostFromUI={removePostFromUI} />
      ))}
    </div>
  )
}
