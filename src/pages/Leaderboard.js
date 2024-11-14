// src/pages/Leaderboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CourseList.css";

function Leaderboard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("classrooms")) || [];
    setCourses(savedCourses);
  }, []);

  const handleCourseClick = (courseCode) => {
    navigate(`/leaderboard/${courseCode}`);
  };

  return (
    <div className="course-list-container">
      <h2>Leaderboard - Select a Course</h2>
      <ul>
        {courses.map((course) => (
          <li
            key={course.classCode}
            onClick={() => handleCourseClick(course.classCode)}
          >
            {course.className}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
