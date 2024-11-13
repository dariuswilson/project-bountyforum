// src/components/CreateClassroom.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateClassroom.css";

function CreateClassroom() {
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate("/sign-in");
    }
  }, [navigate]);

  const handleCreateClassroom = (e) => {
    e.preventDefault();
    alert(`Classroom Created: ${className}, ${classCode}`);
    setClassName("");
    setClassCode("");
    setDescription("");
  };

  return (
    <div className="create-classroom">
      <h2>Create a Classroom</h2>
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
