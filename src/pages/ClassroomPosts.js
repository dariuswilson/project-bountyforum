// src/pages/ClassroomPosts.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/ClassroomPosts.css";

function ClassroomPosts() {
  const { courseCode } = useParams();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedPosts =
      JSON.parse(localStorage.getItem(`posts_${courseCode}`)) || [];
    setPosts(savedPosts);
  }, [courseCode]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    const newPost = {
      id: `${courseCode}-${Date.now()}`, // Unique ID for each post
      title,
      description,
      date: new Date().toLocaleString(),
    };

    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem(`posts_${courseCode}`, JSON.stringify(updatedPosts));
    setTitle("");
    setDescription("");
    setShowForm(false);
  };

  return (
    <div className="class-posts-container">
      <h2>Posts for {courseCode}</h2>
      <button
        onClick={() => setShowForm(!showForm)}
        className="create-post-button"
      >
        {showForm ? "Cancel" : "Create Post"}
      </button>

      {showForm && (
        <form onSubmit={handleCreatePost} className="post-form">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <button type="submit">Post</button>
        </form>
      )}

      <div className="posts-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.id}
              to={`/${courseCode}/post/${post.id}`}
              className="post-item-link"
            >
              <div className="post-item">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <small>{post.date}</small>
              </div>
            </Link>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
}

export default ClassroomPosts;
