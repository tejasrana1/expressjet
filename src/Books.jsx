import React, { useState } from "react";
import { bookList } from "./bookList";
import { Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


function Books(){
    const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    padding: theme.spacing(2),
    height:"330px",
    width:"230px",
    display:"inline-block",
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const classes = useStyles();
    var [search , setSearch] = useState("");
    
    function createBook(book , index){
        if(book.author.toLowerCase().includes(search.toLowerCase()) || book.name.toLowerCase().includes(search.toLowerCase()))
        return(
                <Grid className="book" key={index} item xs={12} sm={12} md={6} lg={4}>
          <Paper className={classes.paper}>
            <a href={book.link} target="_blank">
            <div className="overlay" />
              <div className="book">
                
              <img className="bookimg" src={book.img} alt=""  />
            <div className="bookinfo">
              <h2>{book.author}</h2>
            <h5>{book.name}</h5>
            </div>
            
            </div>
            </a>
          </Paper>

                 
        </Grid>
        )
    }
    function handleChange(e){
        var {value} = e.target;
        setSearch(value)
    }
    if(sessionStorage.getItem("User"))
    return (
        <>
        <NavBar />
        <div className="outerContainer">
          <div className="leaderboard">
          <h1 style={{ textAlign: "center", color: '#000' }}>ExpressRead</h1>
          <div className="disclaimer">
            Disclaimer: These books are for reference purpose only.<br/>If you like a book and want to read it then buy it.
          </div>
        <div className="books">
            <input type="search" autoComplete="off" className="search" placeholder="Book/Author" name="search" value={search} onChange={handleChange} />
            <Grid container spacing={3}>
        {bookList.map(createBook)}
      </Grid>
    <div className={classes.root}>
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

export default Books;