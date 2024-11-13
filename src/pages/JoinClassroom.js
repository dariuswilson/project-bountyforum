// src/pages/JoinClassroom.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/JoinClassroom.css";

function JoinClassroom() {
  const [courseCode, setCourseCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [availableCourses, setAvailableCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/sign-in");
    }

    // getting available courses from localStorage
    const storedCourses = JSON.parse(localStorage.getItem("classrooms")) || [];
    setAvailableCourses(storedCourses);
  }, [navigate]);

  const handleJoinCourse = (e) => {
    e.preventDefault();

    const course = availableCourses.find(
      (c) => c.classCode.toUpperCase() === courseCode.toUpperCase()
    );

    if (course) {
      const joinedCourses =
        JSON.parse(localStorage.getItem("joinedCourses")) || [];

      if (!joinedCourses.some((c) => c.classCode === course.classCode)) {
        joinedCourses.push(course);
        localStorage.setItem("joinedCourses", JSON.stringify(joinedCourses));
        setSuccess(`Successfully joined course: ${course.className}`);
        setError("");
      } else {
        setError("You are already enrolled in this course.");
      }
    } else {
      setError("Invalid course code.");
      setSuccess("");
    }
    setCourseCode("");
  };

  return (
    <div className="join-course-container">
      <h2>Join a Course</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleJoinCourse}>
        <label>Course Code:</label>
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          placeholder="Enter course code..."
          required
        />
        <button type="submit">Join Course</button>
      </form>
    </div>
  );
}

export default JoinClassroom;
