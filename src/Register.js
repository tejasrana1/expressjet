import React, {useState} from "react";
import {useHistory , Link , Redirect} from "react-router-dom";
import $ from "jquery";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";




function Register(props){
    var history = useHistory();
    var [flashError , setError] = useState();
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
            console.log(user);
            $.post('/register', {user})
            .done(res=>{alert("Signup Successfull");
            return history.push("/")})
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
                return <Redirect to="/register" />
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
    return (
        <div>
            {flashError && <div class="alert alert-danger" role="alert">
  {flashError}
</div>}
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={user.name} placeholder="Enter your Name" name="name" required /> <br />
                <input type="text" onChange={handleChange} value={user.phone} placeholder="Enter your Phone Number" name="phone" required /><br />
                <input type="email" onChange={handleChange} value={user.email} placeholder="Enter your Email" name="email" required /><br />
                <input type="text" onChange={handleChange} value={user.username} placeholder="Enter your Username" name="username" required /><br />
                <input type="password" onChange={handleChange} value={user.password} placeholder="Enter Password" name="password" required /><br />
                <input type="password" onChange={passChange} value={cpass} placeholder="Confirm Password" name="cpassword" required /><br />
                <button>Submit</button>
            </form>
            <Link to="/"><button>Login</button></Link>
        </div>
    );
}


export default Register;