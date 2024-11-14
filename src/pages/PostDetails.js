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
    const savedPosts =
      JSON.parse(localStorage.getItem(`posts_${courseCode}`)) || [];
    const selectedPost = savedPosts.find((p) => p.id === postId);
    setPost(selectedPost);

    const savedReplies =
      JSON.parse(localStorage.getItem(`replies_${postId}`)) || [];
    setReplies(savedReplies);

    const savedVotes =
      JSON.parse(localStorage.getItem(`voteCounts_${postId}`)) || {};
    setVoteCounts(savedVotes);
  }, [courseCode, postId]);

  const handleAddReply = (e) => {
    e.preventDefault();
    const newReplyObj = {
      id: `${postId}-${Date.now()}`,
      text: newReply,
      upvotes: 0, // Initialize upvotes for each reply
      date: new Date().toLocaleString(),
      username: currentUser,
    };

    const updatedReplies = [...replies, newReplyObj];
    setReplies(updatedReplies);
    localStorage.setItem(`replies_${postId}`, JSON.stringify(updatedReplies));
    setNewReply("");
  };

  const handleVote = (replyId, type) => {
    const updatedReplies = replies.map((reply) => {
      if (reply.id === replyId) {
        const currentUpvotes = reply.upvotes || 0;
        const isUpvote = type === "up";
        const currentVote = voteCounts[replyId];

        if (
          (currentVote === "up" && isUpvote) ||
          (currentVote === "down" && !isUpvote)
        ) {
          return reply;
        }

        const newUpvotes = isUpvote ? currentUpvotes + 1 : currentUpvotes - 1;
        voteCounts[replyId] = isUpvote ? "up" : "down";

        return { ...reply, upvotes: newUpvotes };
      }
      return reply;
    });

    setReplies(updatedReplies);
    setVoteCounts({ ...voteCounts });
    localStorage.setItem(`replies_${postId}`, JSON.stringify(updatedReplies));
    localStorage.setItem(`voteCounts_${postId}`, JSON.stringify(voteCounts));
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
