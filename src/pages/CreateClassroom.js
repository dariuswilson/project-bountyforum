import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateClassroom.css";

function CreateClassroom() {
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [navigate]);

  const handleCreateClassroom = (e) => {
    e.preventDefault();

    // Retrieve existing classrooms
    const existingClassrooms =
      JSON.parse(localStorage.getItem("classrooms")) || [];

    // Check if the class code is already in use
    const isCodeTaken = existingClassrooms.some(
      (classroom) => classroom.classCode === classCode
    );
    if (isCodeTaken) {
      setError("Class code is already in use. Please choose a different code.");
      return;
    }

    // Create new classroom object
    const newClassroom = {
      className,
      classCode,
      description,
    };

    const updatedClassrooms = [...existingClassrooms, newClassroom];
    localStorage.setItem("classrooms", JSON.stringify(updatedClassrooms));

    const currentUser = localStorage.getItem("currentUser");
    const userCourses =
      JSON.parse(localStorage.getItem(`joinedCourses_${currentUser}`)) || [];
    userCourses.push(newClassroom);
    localStorage.setItem(
      `joinedCourses_${currentUser}`,
      JSON.stringify(userCourses)
    );

    setClassName("");
    setClassCode("");
    setDescription("");
    setError("");

    alert(`Classroom Created: ${className}`);
  };

  return (
    <div className="create-classroom">
      <h2>Create a Classroom</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleCreateClassroom}>
        <label htmlFor="className">Class Name:</label>
        <input
          type="text"
          id="className"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />

        <label htmlFor="classCode">Class Code:</label>
        <input
          type="text"
          id="classCode"
          value={classCode}
          onChange={(e) => setClassCode(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <button type="submit">Create Classroom</button>
      </form>
    </div>
  );
}

export default CreateClassroom;
