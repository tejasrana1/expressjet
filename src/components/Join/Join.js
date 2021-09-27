import React, { useState } from 'react';
import { Link , Redirect } from "react-router-dom";
import NavBar from '../../NavBar';
import './Join.css';

export default function SignIn() {
  const [name, setName] = useState(sessionStorage.getItem("User"));
  const [room, setRoom] = useState('');
if(sessionStorage.getItem("User"))
  return (
    <>
		<NavBar />
      <div className="outerContainer">
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Join</button>
        </Link>
      </div>
    </div>
    </div>
    </>
  );
  else
    {

        return <Redirect to="/" />
    }
}
