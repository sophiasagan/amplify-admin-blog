import { useEffect, useState } from "react";
import "./App.css";

import { DataStore } from "@aws-amplify/datastore";
import { Comment, Post } from "./models";
import { withAuthenticator } from '@aws-amplify/ui-react'

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const func = async () => {
      const models = await DataStore.query(Post);
      console.log(models);
      setPosts(models);
    };
    func();
  }, []);

  const createPost = async () => {
    const post = {
      title: window.prompt("blog post title"),
      content: window.prompt("blog post content"),
    };

    const newPost = await DataStore.save(new Post(post));
    console.log(newPost);
  };
  return (
    <div className="App">
      <button onClick={createPost}>Create Post</button>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default withAuthenticator(App);
