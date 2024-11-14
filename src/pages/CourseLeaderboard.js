// src/pages/CourseLeaderboard.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Leaderboard.css";

function CourseLeaderboard() {
  const { courseCode } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/api/upvotes/${courseCode}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Leaderboard data:", data);
        setLeaderboard(data);
      })
      .catch((error) => console.error("Error fetching leaderboard:", error));
  }, [courseCode]);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard for {courseCode}</h2>
      <ul>
        {leaderboard.length > 0 ? (
          leaderboard.map((user, index) => (
            <li key={index}>
              <span>{user._id}</span>
              <span>{user.totalUpvotes} upvotes</span>
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
