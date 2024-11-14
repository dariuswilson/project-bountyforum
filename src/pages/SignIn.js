import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignIn.css";

function SignIn({ onSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // List of test users
  const handleSignIn = (e) => {
    e.preventDefault();

    const testUsers = [
      { username: "testuser", password: "testuser" },
      { username: "testuser2", password: "testuser2" },
    ];

    const isValidUser = testUsers.some(
      (user) => user.username === username && user.password === password
    );

    if (isValidUser) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", username); // Store the current user
      onSignIn();
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignIn}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
