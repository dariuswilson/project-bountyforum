import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/ClassroomPosts.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

function ClassroomPosts() {
  const { courseCode } = useParams();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch posts from the backend API
    fetch(`${API_BASE_URL}/api/posts/${courseCode}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [courseCode]);

  const handleCreatePost = (e) => {
    e.preventDefault();

    const newPost = {
      courseCode,
      title,
      description,
    };

    // Send the new post to the backend API
    fetch(`${API_BASE_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((createdPost) => {
        setPosts((prevPosts) => [...prevPosts, createdPost]);
        setTitle("");
        setDescription("");
        setShowForm(false);
      })
      .catch((error) => console.error("Error creating post:", error));
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
