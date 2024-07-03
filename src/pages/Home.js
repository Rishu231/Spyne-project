// frontend/src/pages/HomePage.js
import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from './axiosInstance';
import { UserContext } from './UserContext';
import './css/Home.css';

const HomePage = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.post('/users/posts');
        // console.log(response.data)
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    if (!user) {
      alert('Please log in to like a post.');
      return;
    }
    try {
      await axiosInstance.post('/users/addlike', { user_id: user.id, discussion_id: postId });
      // Update the post state to reflect the new like
      setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId, text) => {
    if (!user) {
      alert('Please log in to comment on a post.');
      return;
    }
    try {
      await axiosInstance.post('/users/addcomments', { user_id: user.id, discussion_id: postId, text });
      // Update the post state to reflect the new comment
      setPosts(posts.map(post => post.id === postId ? { ...post, comments: [...post.comments, { text, user_id: user.id, created_on: new Date().toISOString() }] } : post));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="home-page">
      <h1>All Posts</h1>
      <div className="posts-container">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleComment} />
        ))}
      </div>
    </div>
  );
};

const PostCard = ({ post, onLike, onComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="post-card">
      <p>{post.text}</p>
      {post.image && <img src={post.image} alt="Post visual" />}
      <div className="hashtags">
        {post.hashtags.map((tag, index) => (
          <span key={index} className="hashtag">
            #{tag}
          </span>
        ))}
      </div>
      <div className="likes-comments">
        <button onClick={() => onLike(post.id)}>Like ({post.likes})</button>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Add a comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit">Comment</button>
        </form>
        {/* <div className="comments">
          {post.comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>{comment.text}</p>
            </div>
          ))}
        </div>  */}
      </div>
    </div>
  );
};

export default HomePage;
