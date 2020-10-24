import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ postId, postComments }) => {
  // comments are passed now as a props

  // const [comments, setComments] = useState([]);
  // const fetchComments = async () => {
  //   const { data } = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
  //   setComments(data);
  // };
  // useEffect(() => {
  //   fetchComments();
  // }, []);

  const renderedComments = postComments.map(comment => {
    let content = '';
    
    switch(comment.status) {
      case 'approved':
        content = comment.content;
        break;
      case 'rejected':
        content = 'This Comment Is Rejected';
        break;
      case 'pending':
        content = 'Comment Pending Moderation';
        break;
    }

    return (
      <li key={comment.id}>
        {content}
      </li>
    )
  });

  return <ul>{renderedComments}</ul>
}