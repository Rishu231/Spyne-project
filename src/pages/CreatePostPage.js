import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import { UserContext } from './UserContext';
import './css/CreatePostPage.css';

const CreatePostPage = () => {
  const { user } = useContext(UserContext);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [hashtags, setHashtags] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const errors = {};
    if (!text.trim()) {
      errors.text = "Text field is required";
    }
    if (!hashtags.trim()) {
      errors.hashtags = "Hashtags are required";
    }
    return errors;
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = new FormData();
    // formData.append(user_id, "")
    formData.append('text', text);
    formData.append('image', image);
    formData.append('hashtags', hashtags);

    try {
      const response = await axiosInstance.post('/users/addpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Post created successfully!');
      setText('');
      setImage(null);
      setHashtags('');
      setErrors({});
    } catch (error) {
      console.error(error);
      setErrors({ api: 'Failed to create post. Please try again.' });
    }
  };

  return (
    <div className="create-post-container">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Post</h2>
        <div className="form-group">
          <textarea
            placeholder="Write something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          {errors.text && <p className="error">{errors.text}</p>}
        </div>
        <div className="form-group">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter hashtags (comma separated)"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            required
          />
          {errors.hashtags && <p className="error">{errors.hashtags}</p>}
        </div>
        {errors.api && <p className="error">{errors.api}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button type="submit" className="submit-button">Post</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
