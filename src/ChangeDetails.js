import React , {useState} from "react";
import $ from "jquery";
import NavBar from "./NavBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom";

function ChangeDetails(props){
    var [pass , setPass] = useState("");
    var [user , setUser] = useState({
        name:"",
        phone:"",
        email:""
    });
    var [auth ,setAuth] = useState(false);
    function passChange(e){
        let password = e.target.value;
        setPass(password);
    }
    function verifyPassword(event){
        event.preventDefault();
        $.post("https://expressjetapi.herokuapp.com/details" , {username: sessionStorage.getItem("User") , password: pass})
        .done((res)=>{
            let {name , phone, email} = res;
            setUser({
                name:name,
                phone:phone,
                email:email
            })
            setAuth(true);
        })
        .fail(e=>{
            if(e.status===401)
            {
                alert("Wrong Password")
                setPass("");
            }
        })
        
    }
    function handleChange(e){
        let {name , value} = e.target;
        setUser(prevValue=>{
            return {
                ...prevValue,
                [name] : value
            }
        })
    }
    function handleSubmit(event){
        // event.preventDefault();
        $.post("https://expressjetapi.herokuapp.com/updateInfo" , {user , username:sessionStorage.getItem("User")})
        .done(res=>{
        })
        .fail(e=>{return ;})
    }
    if(sessionStorage.getItem("User"))
    return (
        <>
        <NavBar />
        <div className="outerContainer">
        <div className="changeDetails">

            <Container>
                <div className="fcover">
            <Row>
    <Col lg={6}>
            <h1>Change Your Details here</h1>
            
            </Col>
            <Col lg={6}>
                {!auth && <form onSubmit={verifyPassword}>
                <h2>Verify by entering Password</h2>
                <input onChange={passChange} value={pass} type="password" name="password" />
                <Button type="submit" className="fb" variant="success">Submit</Button>
            </form>}
            {auth && <form onSubmit={handleSubmit} >
                <label>Name<br/>
                <input type="text" autoComplete="off" onChange={handleChange} value={user.name}  name="name"   id="name" /></label><br />
                <label>Phone Number<br/>
                <input type="text" autoComplete="off" onChange={handleChange} value={user.phone} name="phone"  id="phone" /></label><br />
                <label>Email<br/>
                <input type="email" autoComplete="off" onChange={handleChange} value={user.email} name="email"   id="email" /></label><br />
                <Button className="fb" type="submit" variant="primary">Change</Button>
                <a href="/home">
                    <Button className="fb" variant="outline-secondary">Cancel</Button>
      
                </a>
            </form>}
            </Col>
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
export default ChangeDetails;