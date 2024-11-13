// src/pages/CourseList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CourseList.css";

function CourseList() {
  const [joinedCourses, setJoinedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/sign-in");
    }

    const savedJoinedCourses =
      JSON.parse(localStorage.getItem("joinedCourses")) || [];
    setJoinedCourses(savedJoinedCourses);
  }, [navigate]);

  const handleDeleteCourse = (courseToDelete) => {
    const updatedCourses = joinedCourses.filter(
      (course) => course.classCode !== courseToDelete.classCode
    );
    setJoinedCourses(updatedCourses);
    localStorage.setItem("joinedCourses", JSON.stringify(updatedCourses));
  };

  return (
    <div className="my-courses-container">
      <h2>Your Courses</h2>
      {joinedCourses.length > 0 ? (
        <ul>
          {joinedCourses.map((course, index) => (
            <li key={index} className="course-item">
              {course.className}
              <span
                className="delete-icon"
                onClick={() => handleDeleteCourse(course)}
              >
                🗑️
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't joined any courses yet.</p>
      )}
    </div>
  );
}

export default CourseList;
