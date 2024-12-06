import React, { useState } from "react";
import axios from "axios";

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/sign-in`, {
        email,
        password,
      });

      setErrorMessage("");
      localStorage.setItem("currentUser", response.data.user); // Store the username
      localStorage.setItem("isAuthenticated", "true");
      onSignIn();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Sign In</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <button
          type="submit"
          style={{ marginTop: "10px", padding: "10px 20px" }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
