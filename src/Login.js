import React , { useState } from "react";
import {useHistory , Link , Redirect} from "react-router-dom";
import $ from "jquery";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {Button} from "@material-ui/core";

function Login(props){
    var [flashError , setError] = useState();
    let history = useHistory();
    var [loginUser , setLUser] = useState({
        username: "",
        password: ""
    })
    function handleLoginChange(e){
        var {name , value} = e.target;
        setLUser((prevValue)=>{
            return {
                ...prevValue,
                [name] : value
            }
        })
    }
    function handleLoginClick(e){
        e.preventDefault();
        setLUser({
            username:"",
            password:""
        })
        $.post('https://expressjetapi.herokuapp.com/login', {username:loginUser.username,password:loginUser.password})
        .done(res=>{
        sessionStorage.setItem("User" , res.username)
        return history.push("/home"); 
        
    })
        .fail(e=>{
            if(e.status===401)
                setError("Wrong Username or Password");
                return <Redirect to ="/" />
            })   
         return <Redirect to="/" /> 
        
    }
    var [user , setUser] = useState({
        name: "",
        phone: "",
        email: "",
        username: "",
        password: ""
    })
    var[cpass , setCpass] = useState("");
    function handleChange(e){
        var {name , value} = e.target;
        setUser((prevValue)=>{
            return {
                ...prevValue,
                [name] : value
            }
        })
    }
    function handleSubmit(event){
        event.preventDefault();
        if(cpass===user.password)
        {
            $.post('https://expressjetapi.herokuapp.com/register', {user})
            .done(res=>{alert("Signup Successfull");
            sessionStorage.setItem("User" , user.username)
            return history.push("/home")
        })
            .fail(e=>{
                var error = JSON.parse(e.responseText);
                setError(error.message);
        setUser((prevValue)=>{
            return {
                ...prevValue,
                username : "",
                phone: "",
                password: ""
            }
        })
        setCpass("");
                return <Redirect to="/" />
            })
            return <Redirect to="/" />
        }
        
        else
        setError("Password Didn't Match...Try again");
        setUser({
        name: "",
        phone: "",
        email: "",
        username: "",
        password: ""
    })
    setCpass("");
    }
    function passChange(e){
        let cpassword = e.target.value;
        setCpass(cpassword)
    }
    $("button").click(function(){
        setError("");
    })
    var [login ,setLogin] = useState(true)
    var [register , setRegister]  = useState(false)
    function openLogin(){
        setLogin(true);
        setRegister(false);
    }
    function openRegister(){
        setLogin(false);
        setRegister(true);
    }
    return (
        <div className="loginPage">
            {flashError && <div className="alert alert-danger" role="alert">
  {flashError}
</div>}
            <h1>ExpressJet</h1>
            <div className="lsContainer">
                <div className="spanContainer">
                    <span id="span" onClick={openLogin} className={(login) ? "login" : null}>Login</span>
                    <span id="span" onClick={openRegister} className={(register) ? "register" : null}>Register</span></div>
        <h2 className="heading">{(login) ? "Login" : "Register"}</h2>
        {(login) ? <div className="login">
            <form onSubmit={handleLoginClick}>
                    <input className="in" autoComplete="off" required onChange={handleLoginChange} value={loginUser.username} type="text" placeholder="Enter Username" name="username" /><br />
                <input className="in" autoComplete="off" required onChange={handleLoginChange} value={loginUser.password} type="password" placeholder="Enter Password" name="password" />
                <br /><Link to="forgot"> Forgot Password </Link> <br /><Button size="medium" variant="contained" color="primary" type="submit">Login</Button>
            </form>
        </div> :
        <div className="register">
            <form onSubmit={handleSubmit}>
                <input type="text" autoComplete="off" onChange={handleChange} value={user.name} placeholder="Enter your Name" name="name" required /> <br />
                <input type="text" autoComplete="off" onChange={handleChange} value={user.phone} placeholder="Enter your Phone Number" name="phone" required /><br />
                <input type="email" autoComplete="off" onChange={handleChange} value={user.email} placeholder="Enter your Email" name="email" required /><br />
                <input type="text" autoComplete="off" onChange={handleChange} value={user.username} placeholder="Enter your Username" name="username" required /><br />
                <input type="password" autoComplete="off" onChange={handleChange} value={user.password} placeholder="Enter Password" name="password" required /><br />
                <input type="password" autoComplete="off" onChange={passChange} value={cpass} placeholder="Confirm Password" name="cpassword" required /><br />
                <Button size="medium" variant="contained" color="secondary" type="submit">Register</Button>
            </form>          
            </div>}
            </div> 
        </div>
    );
    
}

export default Login;