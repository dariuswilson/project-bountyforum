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

    const currentUser = localStorage.getItem("currentUser");
    const savedJoinedCourses =
      JSON.parse(localStorage.getItem(`joinedCourses_${currentUser}`)) || [];
    setJoinedCourses(savedJoinedCourses);
  }, [navigate]);

  const handleRemoveCourse = (courseCode) => {
    const currentUser = localStorage.getItem("currentUser");
    const updatedCourses = joinedCourses.filter(
      (c) => c.classCode !== courseCode
    );
    setJoinedCourses(updatedCourses);
    localStorage.setItem(
      `joinedCourses_${currentUser}`,
      JSON.stringify(updatedCourses)
    );
  };

  return (
    <div className="my-courses-container">
      <h2>Your Courses</h2>
      {joinedCourses.length > 0 ? (
        <ul>
          {joinedCourses.map((course, index) => (
            <li key={index}>
              {course.className}
              <button onClick={() => handleRemoveCourse(course.classCode)}>
                Remove
              </button>
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
