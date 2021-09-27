import React, { useEffect, useState } from "react";
import $ from "jquery";
import NavBar from "./NavBar";
import {Redirect} from "react-router-dom";




function Profile(){
  var [user , setUser] = useState("");
  useEffect(function(){
    $.post("https://expressjetapi.herokuapp.com/profile" , {username : sessionStorage.getItem("User")})
    .done(res=>{setUser(res)})
    .fail(e=>{return ;})
  } , [])
  if(sessionStorage.getItem("User"))
    return (
    <>
    <NavBar />
        <div className="outerContainer">
      <div className="profile">
      <div className="container">
    <div className="main-body">
        <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.name}
                    </div>
                  </div>
                  <hr />
                   <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Username</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.username}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.phone}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info" href="/changeDetails">Edit</a>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </div>
              </div>
        </div>
</div>
</>
    )
    else
    {

        return <Redirect to="/" />
    }
}

export default Profile;