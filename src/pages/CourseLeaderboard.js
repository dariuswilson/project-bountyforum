// src/pages/CourseLeaderboard.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Leaderboard.css";

function CourseLeaderboard() {
  const { courseCode } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const savedPosts =
      JSON.parse(localStorage.getItem(`posts_${courseCode}`)) || [];
    const savedReplies =
      JSON.parse(localStorage.getItem(`replies_${courseCode}`)) || [];

    const userUpvotes = {};

    savedPosts.forEach((post) => {
      if (post.username) {
        const upvotes = post.upvotes || 0;
        userUpvotes[post.username] =
          (userUpvotes[post.username] || 0) + upvotes;
      }
    });

    savedReplies.forEach((reply) => {
      if (reply.username) {
        const upvotes = reply.upvotes || 0;
        userUpvotes[reply.username] =
          (userUpvotes[reply.username] || 0) + upvotes;
      }
    });

    // Sort users by upvotes in descending order
    const sortedUsers = Object.entries(userUpvotes)
      .map(([username, upvotes]) => ({ username, upvotes }))
      .sort((a, b) => b.upvotes - a.upvotes)
      .slice(0, 10); // Limit to top 10 users

    setLeaderboard(sortedUsers);
  }, [courseCode]);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard for {courseCode}</h2>
      <ul>
        {leaderboard.length > 0 ? (
          leaderboard.map((user, index) => (
            <li key={index}>
              <span>{user.username}</span>
              <span>{user.upvotes} upvotes</span>
            </li>
          ))
        ) : (
          <p>No data available for this course.</p>
        )}
      </ul>
    </div>
  );
}

export default CourseLeaderboard;
