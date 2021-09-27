import React, { useEffect, useState } from "react";
import {Link ,Redirect} from "react-router-dom";
import NavBar from "./NavBar";
import $ from "jquery";
import { Button } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';

function ToDo(){
    var [todo , setTodo] = useState({

    });
    var [checker , setChecker] = useState(true);
    var today = new Date().getDay();
    useEffect(()=>{
        $.post("https://expressjetapi.herokuapp.com/gettodo" , {user:sessionStorage.getItem("User")})
        .done
        (res=>{
            setTodo(res)
            if(res.t1===''&&res.t2===''&&res.t3===''&&res.t4===''&&res.t5==='')
            setChecker(false)
        })
        .fail(e=>{
        if(e.status===401)
        console.log("Happy Weekend");
        return ;
        
    })
    } , [])
    function handleClick(e){
        let delitem={
            t:"",
            i:"",
            item:todo.i1
        };
        if(e===1)
        delitem = {
            t: "t1",
            i: "i1",
            item:todo.i1
        }
        if(e===2)
        delitem = {
            t: "t2",
            i: "i2",
            item:todo.i2
        }
        if(e===3)
        delitem = {
            t: "t3",
            i: "i3",
            item:todo.i3
        }
        if(e===4)
        delitem = {
            t: "t4",
            i: "i4",
            item:todo.i4
        }
        if(e===5)
        delitem = {
            t: "t5",
            i: "i5",
            item:todo.i5
        }
        if(window.confirm("Are you sure you are done"))
        $.post("https://expressjetapi.herokuapp.com/delTodoItem" , {delitem , user:sessionStorage.getItem("User")})
        .done(res=>{
            setTodo(res)
            if(res.t1===''&&res.t2===''&&res.t3===''&&res.t4===''&&res.t5==='')
            setChecker(false)
        })
        .fail(e=>{return ;})
    }
    if(sessionStorage.getItem("User"))
    return (
        <>
        <NavBar />
        <div className="outerContainer">
        <div className="challenge">
            <h1>ExpressChallenge</h1>
            {(today!==6 && today!==0) ?
            <div>
                My Points: {todo.points}
                <table cellPadding="8">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Time</th>
                            <th>Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(todo.t1) ?
                        <tr>
                        <td>{todo.t1}</td>
                        <td>{todo.i1}</td>
                        <td><Button onClick={()=>{handleClick(1)}} color="primary" startIcon={<DoneIcon />}></Button></td>
                        </tr> :null}
                        {(todo.t2) ?
                        <tr>
                        <td>{todo.t2}</td>
                        <td>{todo.i2}</td>
                        <td><Button onClick={()=>{handleClick(2)}} color="primary" startIcon={<DoneIcon />}></Button></td>
                        </tr>:null}
                        {(todo.t3) ?
                        <tr>
                        <td>{todo.t3}</td>
                        <td>{todo.i3}</td>
                        <td><Button onClick={()=>{handleClick(3)}} color="primary" startIcon={<DoneIcon />}></Button></td>
                        </tr>:null}
                        {(todo.t4) ?
                        <tr>
                        <td>{todo.t4}</td>
                        <td>{todo.i4}</td>
                        <td><Button onClick={()=>{handleClick(4)}} color="primary" startIcon={<DoneIcon />}></Button></td>
                        </tr>:null}
                        {(todo.t5) ?
                        <tr>
                        <td>{todo.t5}</td>
                        <td>{todo.i5}</td>
                        <td><Button onClick={()=>{handleClick(5)}} color="primary" startIcon={<DoneIcon />}></Button></td>
                        </tr>:null}
                        {!checker && <tr><td colSpan="3"><h4>Nothing Left</h4></td></tr>}
                    </tbody>
                </table>
                
                </div>:
                <div>
                    <h3>Happy Weekend</h3>
                    </div>}
            {(today===1) && <Link to="/createtodo"><Button size="large">Create Challenge</Button></Link>}
            <br /><Link to="/leaderboard"><Button size="large">Leaderboard</Button></Link>
        </div>
        </div>
        </>
    );
    else
    {

        return <Redirect to="/" />
    }
}

export default ToDo;