import React from "react";
import NavBar from "./NavBar";
function About(){
    return(
        <div>
            <NavBar />

            <div className="outerContainer">
                <div className="challenge">
            <h1>ExpressInfo</h1>
            <div className="website">
                <h4>About the site</h4>
                <p><span>ExpressJet:</span> ExpressJet is a social media site made for letting users grow by doing some meaningful/productive tasks while staying connected.</p>
                <p><span>Navbar:</span> Click on ExpressJet to go to home and navigate accordingly</p>
                <p><span>Home:</span> If you want to post something anonymously then there is a option to do that just click on the post button and select anonymous from the popup.</p>
                <p><span>Challenge:</span> User can create challenge on Sunday, the first challenge created will be accepted. Challenge duration can be from 100 minutes to 120 minutes.Challenges are completed from Monday to Friday and points are given according to it.</p>
                <p><span>Read:</span> Many books are available to read and if having any problem with a book or want to request another book then do contact me from mail below.</p>
                <p><span>Chat Room:</span> Enter the name of the room to join the party chat. Users with same room name are put together to chat. Chat records are not kept so are deleted as soon as user left(actually never saved).</p>
                <p><span>Video Chat:</span> Copy the id and send to another user, so he/she can paste it in the textbox and call you.</p>
                <p>If having any problem, want to report something or want to suggest something do contact me through contact info given below.</p>
            </div>
            <div className="personal">
                <h4>About Me</h4>
                <p>Tejas Rana</p>
                <p>tejasrana7771@gmail.com</p>
                <p>8571903737</p>
                <a href="mailto:tejasrana7771@gmail.com">Contact-Me</a>
            </div>
        </div>
        </div>
        </div>
    )
}


export default About;