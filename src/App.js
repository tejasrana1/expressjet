import React  from "react";
import './App.css';
import {Route , Switch } from "react-router-dom";
import Login from "./Login";
import ChangePass from "./ChangePass";
import ChangeDetails from "./ChangeDetails";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home";
import ToDo from "./ToDo";
import CreateTodo from "./CreateTodo";
import Books from "./Books.jsx";
import Profile from "./Profile";
import Post from "./Post";
import About from "./About";
import VideoCall from "./VideoCall";
import Leaderboard from "./Leaderboard";

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

function App() {
  function fourOfour()
  {
    return <h1>404 Not Found</h1>
  }
  return (
    <div className="App">
      
      <Switch>
        <Route  exact path="/" children={<Login   />} /> 
        <Route  exact path="/home" children={<Home />} /> 
        <Route  exact path="/change" children={<ChangePass   />} />
        <Route  exact path="/changeDetails" children={<ChangeDetails  />} />
        <Route  exact path="/todo" children={<ToDo />} />
        <Route  exact path="/createtodo" children={<CreateTodo />} />
        <Route  exact path="/leaderboard" children={<Leaderboard />} />
        <Route  exact path= "/forgot" children = {<ForgotPassword />} />
        <Route  exact path= "/books" children = {<Books />} />
        <Route exact path="/profile" children = {<Profile />} />
        <Route exact path="/about" children = {<About />} />
        <Route path="/join" exact component={Join} />
        <Route path="/chat" component={Chat} />
        <Route exact path="/video" children = {<VideoCall />} />
        <Route exact path="/:postid/post" children = {<Post />} />
        <Route  path="*" component={fourOfour} />
      </Switch>
    </div>
  );
}

export default App;
