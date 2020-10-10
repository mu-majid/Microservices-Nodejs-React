import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
  const [posts, setPosts] = useState({});
  const fetchPosts = async () => {
    const { data } = await axios.get('http://localhost:4002/posts');
    setPosts(data);
    return data;
  };

  // fetch posts when component renders for first time
  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map(post => {
    return (
      <div key={post.id} className="card" style={{ width: '30%', marginBottom: '20px' }}>

        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList postId={post.id} postComments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    )
  })
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
}