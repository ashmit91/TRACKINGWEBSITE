import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">Shipment Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Form className="d-flex">
              <FormControl 
                type="text" 
                placeholder="Search" 
                className="mr-sm-2" 
              />
              <Button variant="outline-light" className="ml-2">Search</Button>
            </Form>
            <Nav.Link href="#notifications" className="ml-2">Notifications</Nav.Link>
            <Nav.Link href="#logout" className="ml-2">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
