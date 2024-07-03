import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from './axiosInstance';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import './css/Home.css';

const HomePage = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.post('/users/posts');
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
      navigate('/');
      return;
    }
    if (likedPosts.includes(postId)) {
      alert('You have already liked this post.');
      return;
    }
    try {
      await axiosInstance.post('/users/addlike', { user_id: user.id, discussion_id: postId });
      // Update only the liked post
      setPosts(posts.map(post => post.id === postId ? { ...post, likes: +post.likes + 1 } : post));
      setLikedPosts([...likedPosts, postId]); // Update likedPosts state with the liked post ID
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
          <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleComment} likedPosts={likedPosts} />
        ))}
      </div>
    </div>
  );
};

const PostCard = ({ post, onLike, onComment, likedPosts }) => {
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
        <button onClick={() => onLike(post.id)} disabled={likedPosts.includes(post.id)}>
          {likedPosts.includes(post.id) ? `Liked (${post.likes})` : `Like (${post.likes})`}
        </button>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Add a comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit">Comment</button>
        </form>
        <div className="comments">
          {post.comments.map((comment) => (
            <div key={comment.comment_id} className="comment">
              <p>{comment.comment_user_name}</p>
              <p>{comment.comment_text}</p>
            </div>
          ))}
        </div> 
      </div>
    </div>
  );
};

export default HomePage;
