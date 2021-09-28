import React , {useState , useEffect} from "react";
import {Link , useHistory , Redirect } from "react-router-dom";
import $ from "jquery";
import NavBar from "./NavBar";
import Button from '@material-ui/core/Button';
import {Button as Btn} from "react-bootstrap";
import SendIcon from '@material-ui/icons/Send';
import TextareaAutosize from 'react-textarea-autosize';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Popup from "./Popup";


function Home(){
var today;
var objToday = new Date(),
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()]
    const history = useHistory();
    var [allPosts , setAll] = useState({value: []});
    var [Post , setPost] = useState({
        post: "",
        postUser: sessionStorage.getItem("User"),
        sharing : sessionStorage.getItem("User"),
        date: dayOfMonth + " " + curMonth
    })
    // var [singleComment, setSingleComment] = useState("");
    var [comment , setComment] = useState({
        postid: "",
        name: sessionStorage.getItem("User"),
        text: ""
    })
    useEffect(()=>{
        $.get("https://expressjetapi.herokuapp.com/post")
        .done((res)=>{
            setAll({value: res.reverse()})
        })
        .fail(e=>{return ;})
    } , [])
    function handleSubmit(event){
        event.preventDefault();
        setIsOpen(!isOpen);

            Post.post = event.target.post.value
            setPost(prevValue=>{
                return{
                    ...prevValue,
                    post: event.target.post.value
                }
            })
        $.post("https://expressjetapi.herokuapp.com/post" , {Post})
        .done((res)=>{
            setAll({value:res.reverse()});
        })
        .fail(e=>{return ;})
        setPost({
            post:"",
            postUser: sessionStorage.getItem("User"),
            sharing: sessionStorage.getItem("User")
        })
        event.target.post.value="";
    }
    
     function sendComment(event){
         event.preventDefault();
        comment.postid=event.target.postid.value;
        comment.text=event.target.text.value;
        // setSingleComment(event.target.text.value)
        comment.name=sessionStorage.getItem("User");
        setComment({postid: event.target.postid.value,text : event.target.text.value,name:sessionStorage.getItem("User")});
          $.post("https://expressjetapi.herokuapp.com/comment" , {comment})
         .done(res=>{setAll({value:res.reverse()});
        history.push(`/${comment.postid}/post`)})
         .fail(e=>{return ;})
     }
     
    function Mapped(props){
        function deletePost(e){
            let deleteId = props.id;
        e.preventDefault();
        if(window.confirm("Are you sure to delete"))
        {
            $.post("https://expressjetapi.herokuapp.com/delete" , {deleteId})
            .done(res=>{
                setAll({value:res.reverse()});
            })
            .fail(error=>{return ;})
        }
        
    }
        return (
            <div className="postBody">
                <div className="postUser">
                    {props.sharing}
                    
                    {(props.user===sessionStorage.getItem("User")) && 
                    <Button onClick={deletePost} size="large" variant="text" color="default" startIcon={<DeleteOutlineOutlinedIcon  />} ></Button>
                    }
                    <p>{props.date}</p>
                </div>
                <div className="postText">
                    <p>{props.data}</p>
                </div>
                <div className="comment">
                    <div className="cheader">
                        
                        <Link to={{
                  pathname: `/${props.id}/post`}}>{props.comment} Comments</Link>
                  {/* <p>{singleComment}</p> */}
                    </div>
                <form className="cfooter" onSubmit={sendComment}>
                    <input type="hidden" name="postid" value={props.id} />
                    <input type="text" required autoComplete="off" name="text"  placeholder="Comment"/>
                    <Button type="submit" variant="outlined" color="primary" startIcon={<SendIcon />}></Button>
                </form>
                </div>
            </div>
        );
    }
    function mapped(allPosts){return <Mapped key={allPosts.id} comment={allPosts.comment} id={allPosts.id} user={allPosts.postUser} sharing={allPosts.sharing} data={allPosts.post} date={allPosts.date} />}

    function handleChange(e){
        let {name , value} = e.target;
        setPost(prevValue=>{
            return{
                ...prevValue,
                [name] : value
            }
        })
    }
    const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  if(sessionStorage.getItem("User"))
  return (
      <>
      <NavBar />
        <div className="outerContainer">
    <div className="homePage">
        <div className="posts">
            <div className="inputPost">
                <form onSubmit={handleSubmit}>
                    {isOpen && <Popup
      content={<>
        <h1>How do you want to post</h1>
        <select value={Post.sharing} onChange={handleChange} name="sharing">
                        <option value={sessionStorage.getItem("User")}>{sessionStorage.getItem("User")}</option>
                        <option value="anonimous">Anonimous</option>
                    </select><br />
        <Btn type="submit" className="fb">Post</Btn>
      </>}
      handleClose={togglePopup}
    />}
                    <TextareaAutosize className="txtArea" minRows="3" required name="post" placeholder="Enter the post here" cols="38" /><br />
                    <Btn type="button" onClick={togglePopup} className="fb">Post</Btn>
                </form>
            </div>
            <div className="post">
                {allPosts.value.map(mapped)}
            </div>
        </div>
    </div>
        </div>
        </>
  );
  else
    {

        return <Redirect to="/" />
    }
}

export default Home;