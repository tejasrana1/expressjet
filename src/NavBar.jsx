import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar(){
    function logout(){
        sessionStorage.removeItem("User");
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
  <Container>
  <Navbar.Brand href="/home">ExpressJet</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="m-auto">
      <Nav.Link className="navLink" href="/todo">Challenge</Nav.Link>
      <Nav.Link className="navLink" href="/books">Read</Nav.Link>
      <Nav.Link className="navLink" href="/join">Chat Room</Nav.Link>
      <Nav.Link className="navLink" href="/video">Video Chat</Nav.Link>
      <Nav.Link className="navLink" href="/about">About</Nav.Link>
    </Nav>
    <Nav className="navProfile">
      <NavDropdown title={sessionStorage.getItem("User")} id="collasible-nav-dropdown">
        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
        <NavDropdown.Item href="/change">Change Password</NavDropdown.Item>
        <NavDropdown.Item href="/changeDetails">Edit Details</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/" onClick={logout}>Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    )
}

export default NavBar;