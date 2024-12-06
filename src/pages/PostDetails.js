import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/PostDetails.css";

function PostDetails() {
  const { courseCode, postId } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const currentUser = localStorage.getItem("currentUser");
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

  useEffect(() => {
    // Try fetching from localStorage first
    const savedPosts =
      JSON.parse(localStorage.getItem(`posts_${courseCode}`)) || [];
    const selectedPost = savedPosts.find((p) => p._id === postId);

    if (selectedPost) {
      setPost(selectedPost);
    } else {
      // Fetch from backend
      fetch(`${API_BASE_URL}/api/posts/post/${postId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch post from backend");
          }
          return response.json();
        })
        .then((data) => setPost(data))
        .catch((error) => console.error("Error fetching post:", error));
    }

    // Fetch replies from the backend
    fetch(`${API_BASE_URL}/api/replies/${postId}`)
      .then((response) => response.json())
      .then((data) => setReplies(data))
      .catch((error) => console.error("Error fetching replies:", error));
  }, [courseCode, postId]);

  const handleAddReply = (e) => {
    e.preventDefault();
    const newReplyObj = {
      postId,
      text: newReply,
      username: currentUser,
    };

    fetch(`${API_BASE_URL}/api/replies`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReplyObj),
    })
      .then((response) => response.json())
      .then((data) => {
        setReplies([...replies, data]);
        setNewReply("");
      })
      .catch((error) => console.error("Error saving reply:", error));
  };

  return (
    <div className="post-details-container">
      {post ? (
        <div className="post-item">
          <h2>{post.title}</h2>
          <p className="post-author">Posted by: {post.username}</p>
          <p>{post.description}</p>
          <small>{post.date}</small>
        </div>
      ) : (
        <p>Loading post...</p>
      )}

      <div className="replies-section">
        <h3>Replies</h3>
        {replies.map((reply) => (
          <div key={reply._id} className="reply-item">
            <p className="reply-author">Replied by: {reply.username}</p>
            <p>{reply.text}</p>
            <small>{reply.date}</small>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddReply} className="add-reply-form">
        <textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Write a reply..."
          required
        ></textarea>
        <button type="submit">Post Reply</button>
      </form>
    </div>
  );
}

export default PostDetails;
