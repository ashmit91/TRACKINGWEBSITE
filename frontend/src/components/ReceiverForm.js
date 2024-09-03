import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ReceiverPage = () => {
  const [receiver, setReceiver] = useState({ name: '', mobile: '', address: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceiver((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!receiver.name) {
      newErrors.name = 'Name is required';
    }
    if (!receiver.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(receiver.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    if (!receiver.address) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      localStorage.setItem('receiver', JSON.stringify(receiver));
      navigate('/shipment');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col md={6} sm={12}>
          <h2 style={styles.heading}>Receiver Information</h2>
          <Form style={styles.form}>
            <Form.Group controlId="receiverName">
              <Form.Label style={styles.label}>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={receiver.name}
                onChange={handleChange}
                placeholder="Enter receiver's name"
                isInvalid={!!errors.name}
                style={styles.input}
              />
              <Form.Control.Feedback type="invalid" style={styles.error}>
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="receiverMobile">
              <Form.Label style={styles.label}>Mobile:</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={receiver.mobile}
                onChange={handleChange}
                placeholder="Enter receiver's mobile"
                isInvalid={!!errors.mobile}
                style={styles.input}
              />
              <Form.Control.Feedback type="invalid" style={styles.error}>
                {errors.mobile}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="receiverAddress">
              <Form.Label style={styles.label}>Address:</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={receiver.address}
                onChange={handleChange}
                placeholder="Enter receiver's address"
                isInvalid={!!errors.address}
                style={styles.input}
              />
              <Form.Control.Feedback type="invalid" style={styles.error}>
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="button" onClick={handleNext} style={{ width: '100%' }}>
              Next
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const styles = {
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: '1.5em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    marginBottom: '15px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
  },
  error: {
    color: 'red',
    fontSize: '0.875em',
  },
};

export default ReceiverPage;
