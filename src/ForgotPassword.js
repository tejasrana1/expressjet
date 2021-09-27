import React , {useState} from "react";
import {useHistory} from "react-router-dom";
import $ from "jquery";
import Button from "react-bootstrap/Button";

function ForgotPassword(){
    const history = useHistory();
    var [username , setUsername] = useState("");
    function handleChange(e){
        let val = e.target.value;
        setUsername(val);
    }
    function handleSubmit(e){
        e.preventDefault();
        $.post("https://expressjetapi.herokuapp.com/forgot" , {username})
        .done(res=>{
            if(res.message)
            alert("Password sent on registered email")
            history.push("/")

        })
        .fail (e=>{alert("Some error occured. Try again")})
    }
    return (
        
            <div className="outerContainer">
                <div className="forgot">
                    <div className="leaderboard">
            <h1>Recover Password</h1>
            <h4>
                Enter your username. Password will <br />be sent to registered email address
            </h4>
            <form onSubmit={handleSubmit}>
                    <input autoComplete="off" placeholder="Username"  onChange={handleChange} type="text" name="username" value={username} required /><br />
                    <Button variant="danger" className="fb" type="submit" >Submit</Button>
                
            </form>
        </div>
        </div>
        </div>
    )
}

export default ForgotPassword;