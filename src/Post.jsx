import React, { useEffect, useState } from "react";
import { useParams ,Redirect } from "react-router-dom";
import $ from "jquery";
import NavBar from "./NavBar";
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';


function Post(){
    var [post , setPost] = useState({comment:[]});
    var [comment , setComment] = useState({
        postid: "",
        name: sessionStorage.getItem("User"),
        text: ""
    })
    var {postid} = useParams();
    useEffect(function(){
        $.post("https://expressjetapi.herokuapp.com/singlepost" , {postid})
        .done( (res)=>{ setPost(res)})
        .fail(e=>{return ;})
    } , [])

     function sendComment(event){
         event.preventDefault();
        comment.postid=event.target.postid.value;
        comment.name=sessionStorage.getItem("User");
        setComment({postid: event.target.postid.value,text : event.target.text.value,name:sessionStorage.getItem("User")});
          $.post("https://expressjetapi.herokuapp.com/singlecomment" , {comment})
         .done( (res)=>{ setPost(res)})
         .fail(e=>{return ;})
         setComment({text:""})
     }
     function handleChange(e){
         setComment(prevValue=>{
             return{
                 ...prevValue,
                 text: e.target.value
             }
         })
     }
     function Comment(props){
         function commentClick(e){
         e.preventDefault();
         if(window.confirm("Are you sure to delete this comment"))
        {
         $.post("https://expressjetapi.herokuapp.com/delcomment" , {postid:postid,commentid:props.post._id})
         .done(res=>{
             setPost(res);
            })
         .fail(e=>{return ;})
        }
     }
         return (
             <div className="commentBox">
                 <div className="commentName">
                     <p>{props.post.name}
                     {(props.post.name===sessionStorage.getItem("User")) && <Button className="commentButton" size="small" onClick={commentClick} variant="outlined" color="default" startIcon={<DeleteOutlineOutlinedIcon  />} ></Button>}</p>
                     </div>
                     <div className="commentText">
                         <p>{props.post.text}</p>
                         </div>         
                                    
                                </div>
         )
     }
     if(sessionStorage.getItem("User"))
    return(
        <>
        <NavBar />
                <div className="outerContainer">
        <div className="postBody">
                <div className="postUser">
                    {post.sharing}
                    <p>{post.date}</p>
                </div>
                <div className="postText">
                    <p>{post.post}</p>
                </div>
                <hr className="commentLine" />
                <div className="comment">
                    <div className="cheader">
                        {post.comment && post.comment.map(function(cm){
                
                            return <Comment key={cm._id} post={cm} />
                        })}
                    </div>
                <form className="cfooter" onSubmit={sendComment}>
                    <input type="hidden" name="postid" value={postid} />
                    <input onChange={handleChange} value={comment.text} type="text" name="text"  placeholder="Comment"/>
                    <Button type="submit" variant="outlined" color="primary" startIcon={<SendIcon />}></Button>
                </form>
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

export default Post;