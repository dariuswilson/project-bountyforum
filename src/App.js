// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CourseList from "./pages/CourseList";
import CreateClassroom from "./pages/CreateClassroom";
import JoinClassroom from "./pages/JoinClassroom";
import Leaderboard from "./pages/Leaderboard";
import PostDetails from "./pages/PostDetails";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const handleSignIn = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/create-classroom" element={<CreateClassroom />} />
          <Route path="/join-classroom" element={<JoinClassroom />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/sign-in" element={<SignIn onSignIn={handleSignIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
