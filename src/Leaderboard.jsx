import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import $ from "jquery"
import { DataGrid } from '@mui/x-data-grid';


function Leaderboard(){
    function mapped(u , index){
        return(
            {
            id:index, 
            rank:index+1 , 
            username:u.username , 
            points:u.points }
        )
    }
    var [rows , setRows] = useState([])
    useEffect(()=>{
        $.get("https://expressjetapi.herokuapp.com/leaderboard")
        .done(res=>{
            setRows(res.map(mapped))
        })
        .fail(e=>{return ;})
    } , [])
    
    const columns = [
  { field: 'rank', headerName: 'Rank', width: 120 },
  { field: 'username', headerName: 'Username', width: 200 },
  { field: 'points', headerName: 'Points', width: 130 },
];
if(sessionStorage.getItem("User"))
    return(
        <>
        <NavBar />
        <div className="outerContainer">
            <div className="leaderboard">
                <h1 style={{ marginBottom:"50px"}}>ExpressLead</h1>
             <div className="datagrid" style={{ height: 400, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
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

export default Leaderboard;
