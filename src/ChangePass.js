import React , { useState } from "react";
import { Redirect} from "react-router-dom";
import $ from "jquery";
import NavBar from "./NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function ChangePass(props){
    var [pass , setPass ]= useState({
        oldPass:"",
        newPass:"",
        cPass:""
    })
    function handleChange(e){
        var {name , value} = e.target;
        setPass(prevValue=>{
            return {
                ...prevValue,
                [name]: value
            }
        })
    }
    function handleSubmit(event){
        event.preventDefault();
        if(pass.newPass === pass.cPass)
        {
            $.post("https://expressjetapi.herokuapp.com/changePass" , {username:sessionStorage.getItem("User"),oldPassword:pass.oldPass,newPassword:pass.newPass})
            .done(res=>{
                alert("Password changed");
            })
            .fail(e=>{
                alert("Password not correct. Login again");
                return ;
            })
        }
        
        else
        {
            alert("Password Mismatch");
        }
        
        setPass({
            oldPass:"",
            newPass:"",
            cPass:""
        })
        sessionStorage.removeItem("User");
        
    }
    
    if(sessionStorage.getItem("User"))
    return (
        <>
        <NavBar />
        <div className="outerContainer">
        <div className="changePass">
            <Container>
                <div className="fcover">
  <Row>
    <Col lg={6}>
        <h1>
            Change Password
        </h1>
    </Col>
    <Col lg={4}><form onSubmit={handleSubmit}>
                <input required type="password" autoComplete="off" onChange={handleChange} value={pass.oldPass} name="oldPass" placeholder="Enter current password" /><br />
                <input required type="password" autoComplete="off" onChange={handleChange} value={pass.newPass} name="newPass" placeholder="Enter new password" /><br />
                <input required type="password" autoComplete="off" onChange={handleChange} value={pass.cPass} name="cPass" placeholder="Confirm Password" /><br />
                <Button className="fb" type="submit" variant="primary">Change</Button>
                <a href="/home">
                    <Button className="fb" variant="outline-secondary">Cancel</Button>
      
                </a>
            </form></Col>
  </Row>
  </div>
  </Container>
        </div>
        </div>
        </>
    );
    else
    {

        return <Redirect to="/" />
    }
}

export default ChangePass;