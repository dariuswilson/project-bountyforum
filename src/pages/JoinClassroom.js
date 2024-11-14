import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/JoinClassroom.css";

function JoinClassroom() {
  const [courseCode, setCourseCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [navigate]);

  const handleJoinCourse = (e) => {
    e.preventDefault();

    const availableCourses =
      JSON.parse(localStorage.getItem("classrooms")) || [];
    const currentUser = localStorage.getItem("currentUser");

    const course = availableCourses.find((c) => c.classCode === courseCode);
    if (course) {
      const userCourses =
        JSON.parse(localStorage.getItem(`joinedCourses_${currentUser}`)) || [];

      if (!userCourses.some((c) => c.classCode === courseCode)) {
        userCourses.push(course);
        localStorage.setItem(
          `joinedCourses_${currentUser}`,
          JSON.stringify(userCourses)
        );
        setSuccess(`Successfully joined course: ${courseCode}`);
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
