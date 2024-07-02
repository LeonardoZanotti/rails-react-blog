import { useState } from "react";
import "./App.css";
import PostsList from "./features/posts/PostsList";

function App() {
  return (
    <>
      <div className="app">
        <h1>React on Rails blog</h1>
        <p>Find this application layout in frontend/src/app.tsx</p>
        <PostsList />
      </div>
    </>
  );
}

export default App;
