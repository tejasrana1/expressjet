import React , {useEffect, useState} from "react";
import $ from "jquery";
import NavBar from "./NavBar";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
function CreateTodo(){
    var history = useHistory();
    var [verify , setVerify] = useState();
    useEffect(()=>{
        $.get("https://expressjetapi.herokuapp.com/verifytodo")
        .done(res=>{setVerify(res)})
        .fail(e=>{return ;})
    } , [])
    var [availTime , setTime] = useState(parseInt(120));
    var [inputTime , setInput] = useState({
            user: sessionStorage.getItem("User"),
            t1:"",
            i1:"",
            t2:"",
            i2:"",
            t3:"",
            i3:"",
            t4:"",
            i4:"",
            t5:"",
            i5:""
    });
    var day = new Date().getDay();
    function handleChange(e){
        let {name , value} = e.target;
        setInput(prevValue=>{
            return{
                ...prevValue,
                [name]: value
            }
        })
    }
    var [i , setI] = useState(1);
    function addInput(e){
        if(i<=4)
        setI(i+1);
    }
    function subtractInput(e){
        if(i>=2)
        {
            if(i===5)
            {inputTime.i5="";
            inputTime.t5="";}
            if(i===4)
            {inputTime.i4="";
            inputTime.t4="";}
            if(i===3)
            {inputTime.i3="";
            inputTime.t3="";}
            if(i===2)
            {inputTime.i2="";
            inputTime.t2="";}
            setI(i-1);
        }
        
    }
    var totalTime = 0;
    function checkAvail(e){
        totalTime=0;
        availTime=120;
        if(inputTime.i1.length && inputTime.i1<=120 && inputTime.i1>=0)
        {
            totalTime = totalTime+ parseInt(inputTime.i1)
        }
        if(inputTime.i2.length && inputTime.i2<=120 && inputTime.i2>=0)
        {
            totalTime = totalTime+ parseInt(inputTime.i2)
        }
        if(inputTime.i3.length && inputTime.i3<=120 && inputTime.i3>=0)
        {
            totalTime = totalTime+ parseInt(inputTime.i3)
        }
        if(inputTime.i4.length && inputTime.i4<=120 && inputTime.i4>=0)
        {
            totalTime = totalTime+ parseInt(inputTime.i4)
        }
        if(inputTime.i5.length && inputTime.i5<=120 && inputTime.i5>=0)
        {
            totalTime = totalTime+ parseInt(inputTime.i5)
        }
        setTime(availTime=availTime-totalTime);
    }
    function handleSubmit(e){
        e.preventDefault();
        checkAvail();
        if(availTime<=20 && availTime>=0)
        {
            $.post("https://expressjetapi.herokuapp.com/createtodo" , {inputTime})
            .done(res=>{
            alert("Created Successfull")
            history.push("/home")
            // return <Redirect to="/home" />
        })
            .fail(e=>{
                if(e.status===400)
                {
                    alert("List already exist");
                history.push("/home")
                }
                
            })
        }
        else
        alert("Time should be in the range of 100 to 120 minutes");
    }
    if(sessionStorage.getItem("User"))
    return (
        <>
        <NavBar />
        <div className="outerContainer">
        <div className="createChallenge">
<div>
            <h1>Create Challenge</h1>
            <h3>Available Time {availTime}</h3>
            <Button type="button" className="submitButton" onClick={checkAvail} variant="contained" color="secondary">Update Availability</Button>
            <form onSubmit={handleSubmit}>
                <input type="text" autoComplete="off" className="taskInput" name="t1" placeholder="Task 1" required value={inputTime.t1} onChange={handleChange} />
                <input className="i1 numberInput" autoComplete="off" name="i1" type="number" placeholder="Limit" min="0" max="120" value={inputTime.i1} onChange={handleChange} required /><br />
                {(i>=2) && <div><input type="text" autoComplete="off" className="taskInput" name="t2" placeholder="Task 2" required value={inputTime.t2} onChange={handleChange} /><input className="i2 numberInput" autoComplete="off" name="i2" type="number" placeholder="Limit" min="0" max="120" value={inputTime.i2} onChange={handleChange} required /><br /></div>}
                {(i>=3) && <div><input type="text" autoComplete="off" className="taskInput" name="t3" placeholder="Task 3" required value={inputTime.t3} onChange={handleChange} /><input className="i3 numberInput" autoComplete="off" name="i3" type="number" placeholder="Limit" min="0" max="120" value={inputTime.i3} onChange={handleChange} required /><br /></div>}
                {(i>=4) && <div><input type="text" autoComplete="off" className="taskInput" name="t4" placeholder="Task 4" required value={inputTime.t4} onChange={handleChange} /><input className="i4 numberInput" autoComplete="off" name="i4" type="number" placeholder="Limit" min="0" max="120" value={inputTime.i4} onChange={handleChange} required /><br /></div>}
                {(i>=5) && <div><input type="text" autoComplete="off" className="taskInput" name="t5" placeholder="Task 5" required value={inputTime.t5} onChange={handleChange} /><input className="i5 numberInput" autoComplete="off" name="i5" type="number" placeholder="Limit" min="0" max="120" value={inputTime.i5} onChange={handleChange} required /><br /></div>}
                <Button type="button" className="toggleButton" onClick={subtractInput} variant="outlined" color="secondary" startIcon={<RemoveIcon />}></Button>
                <Button type="button" className="toggleButton" onClick={addInput} variant="outlined" color="primary" startIcon={<AddIcon />}></Button>
                <br />
                <Button type="submit" disabled={(verify || day!==0) ? true : false} className="submitButton" variant="contained" color="primary">Submit</Button>
            </form>
        </div> 
        {(day!==0) ?<div><h1>Sorry..You can't create a list today...Come on Sunday</h1></div> :
         verify && <h1>Sorry..List already exist</h1>}
        </div>
        </div>
        </>
    );
    else
    {

        return <Redirect to="/" />
    }
}

export default CreateTodo;