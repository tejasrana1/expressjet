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
        <Route  exact path="https://expressjet.netlify.app/" children={<Login   />} /> 
        <Route  exact path="https://expressjet.netlify.app/home" children={<Home />} /> 
        <Route  exact path="https://expressjet.netlify.app/change" children={<ChangePass   />} />
        <Route  exact path="https://expressjet.netlify.app/changeDetails" children={<ChangeDetails  />} />
        <Route  exact path="https://expressjet.netlify.app/todo" children={<ToDo />} />
        <Route  exact path="https://expressjet.netlify.app/createtodo" children={<CreateTodo />} />
        <Route  exact path="https://expressjet.netlify.app/leaderboard" children={<Leaderboard />} />
        <Route  exact path= "https://expressjet.netlify.app/forgot" children = {<ForgotPassword />} />
        <Route  exact path= "https://expressjet.netlify.app/books" children = {<Books />} />
        <Route exact path="https://expressjet.netlify.app/profile" children = {<Profile />} />
        <Route exact path="https://expressjet.netlify.app/about" children = {<About />} />
        <Route path="https://expressjet.netlify.app/join" exact component={Join} />
        <Route path="https://expressjet.netlify.app/chat" component={Chat} />
        <Route exact path="https://expressjet.netlify.app/video" children = {<VideoCall />} />
        <Route exact path="https://expressjet.netlify.app/:postid/post" children = {<Post />} />
        <Route  path="*" component={fourOfour} />
      </Switch>
    </div>
  );
}

export default App;
