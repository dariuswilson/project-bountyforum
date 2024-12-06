import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header({ isAuthenticated, onSignOut }) {
  return (
    <header className="header">
      <div className="header-title">
        <Link to="/">BountyForum</Link>
      </div>
      <nav className="header-nav">
        <Link to="/">Courses</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/create-classroom">Create Classroom</Link>
        <Link to="/join-classroom">Join Classroom</Link>
        {isAuthenticated ? (
          <span className="signed-in" onClick={onSignOut}>
            Signed In (Sign Out)
          </span>
        ) : (
          <>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
