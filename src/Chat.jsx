import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import "./App.css"
import NavBar from "./NavBar"

function Chat() {
	const [ state, setState ] = useState({ message: "", name: sessionStorage.getItem("User") })
	const [ chat, setChat ] = useState([])

	const socketRef = useRef()
	
	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:4000")
			
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			socketRef.current.on("join", (usnm) => {
				setChat([ ...chat, {name:usnm} ])
			})
			socketRef.current.on("pre_disconnect", (usnm) => {
            setChat([ ...chat, {name:usnm} ])
        })
		},
		[ chat ]
	)
	useEffect(
		() => {
			let usnm = sessionStorage.getItem("User");
			socketRef.current.emit("join" ,{usnm});
			return () => {
          socketRef.current.emit("pre_disconnect" ,{usnm});
          socketRef.current.disconnect()
        }
		},
		[  ]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { name, message } = state
		socketRef.current.emit("message", { name, message })
		e.preventDefault()
		setState({ message: "", name })
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}{message && <span> : {message}</span>}
				</h3>
			</div>
		))
	}

	return (
		<>
		<NavBar />
        <div className="outerContainer">
			<h1 style={{ textAlign: "center", color: '#000' }}>ExpressCall</h1>
		<div className="card">
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
				</div>
				<button>Send Message</button>
			</form>
			<div className="render-chat">
				<h1>Chat Log</h1>
				{renderChat()}
			</div>
		</div>
        </div>
		</>
	)
}

export default Chat