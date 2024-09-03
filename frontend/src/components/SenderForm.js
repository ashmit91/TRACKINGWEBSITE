import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const SenderForm = () => {
  const [senderData, setSenderData] = useState({
    name: '',
    mobile: '',
    address: ''
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSenderData({ ...senderData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('sender', JSON.stringify(senderData)); // Save data to localStorage
    navigate('/receiver'); // Navigate to the Receiver page
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col md={6} sm={12}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="senderName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={senderData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="senderMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                placeholder="Enter mobile number"
                value={senderData.mobile}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="senderAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                placeholder="Enter address"
                value={senderData.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ width: '100%' }}>
              Next
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SenderForm;
