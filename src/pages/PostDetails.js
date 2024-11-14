// src/pages/PostDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/PostDetails.css";

function PostDetails() {
  const { courseCode, postId } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [voteCounts, setVoteCounts] = useState({});
  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    // Fetch the selected post
    const savedPosts =
      JSON.parse(localStorage.getItem(`posts_${courseCode}`)) || [];
    const selectedPost = savedPosts.find((p) => p.id === postId);
    setPost(selectedPost);

    // Fetch replies from the backend for the specified postId
    fetch(`http://localhost:5001/api/replies/${postId}`)
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

    fetch("http://localhost:5001/api/replies", {
      method: "POST",
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

  const handleVote = async (replyId, type) => {
    const updatedReplies = replies.map((reply) => {
      if (reply.id === replyId) {
        const isUpvote = type === "up";
        const newUpvotes = isUpvote ? reply.upvotes + 1 : reply.upvotes - 1;

        // Send a POST request to save the updated upvote count
        fetch("http://localhost:5001/api/upvotes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: postId,
            userId: currentUser,
            courseCode: courseCode,
            upvotes: newUpvotes,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Upvote saved:", data);
            // Update state only after successful save
            setReplies((prevReplies) =>
              prevReplies.map((r) =>
                r.id === replyId ? { ...r, upvotes: newUpvotes } : r
              )
            );
          })
          .catch((error) => console.error("Error saving upvote:", error));

        return { ...reply, upvotes: newUpvotes };
      }
      return reply;
    });

    setReplies(updatedReplies);
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
          <div key={reply.id} className="reply-item">
            <p className="reply-author">Replied by: {reply.username}</p>
            <p>{reply.text}</p>
            <small>{reply.date}</small>
            <div className="vote-controls">
              <button onClick={() => handleVote(reply.id, "up")}>👍</button>
              <span>{reply.upvotes}</span>
              <button onClick={() => handleVote(reply.id, "down")}>👎</button>
            </div>
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
