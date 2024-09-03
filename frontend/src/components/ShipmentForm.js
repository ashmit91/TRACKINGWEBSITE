import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ShipmentPage = () => {
  const [shipment, setShipment] = useState({
    order: '',
    orderDate: '',
    orderPlace: '',
    deliveryDate: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipment((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!shipment.order) {
      newErrors.order = 'Order is required';
    }
    if (!shipment.orderDate) {
      newErrors.orderDate = 'Order date is required';
    }
    if (!shipment.orderPlace) {
      newErrors.orderPlace = 'Order place is required';
    }
    if (!shipment.deliveryDate) {
      newErrors.deliveryDate = 'Delivery date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      localStorage.setItem('shipment', JSON.stringify(shipment));
      navigate('/tracker');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col md={6} sm={12}>
          <h2 style={styles.heading}>Shipment Information</h2>
          <Form style={styles.form}>
            <Form.Group controlId="order">
              <Form.Label style={styles.label}>Order</Form.Label>
              <Form.Control
                type="text"
                name="order"
                placeholder="Enter order"
                value={shipment.order}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.order && <p style={styles.error}>{errors.order}</p>}
            </Form.Group>

            <Form.Group controlId="orderDate">
              <Form.Label style={styles.label}>Order Date</Form.Label>
              <Form.Control
                type="date"
                name="orderDate"
                value={shipment.orderDate}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.orderDate && <p style={styles.error}>{errors.orderDate}</p>}
            </Form.Group>

            <Form.Group controlId="orderPlace">
              <Form.Label style={styles.label}>Order Place</Form.Label>
              <Form.Control
                type="text"
                name="orderPlace"
                placeholder="Enter order place"
                value={shipment.orderPlace}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.orderPlace && <p style={styles.error}>{errors.orderPlace}</p>}
            </Form.Group>

            <Form.Group controlId="deliveryDate">
              <Form.Label style={styles.label}>Delivery Date</Form.Label>
              <Form.Control
                type="date"
                name="deliveryDate"
                value={shipment.deliveryDate}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.deliveryDate && <p style={styles.error}>{errors.deliveryDate}</p>}
            </Form.Group>

            <Button variant="primary" onClick={handleNext} style={styles.button}>
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
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
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
    marginTop: '5px',
  },
  '@media (max-width: 768px)': {
    heading: {
      fontSize: '1.25em',
    },
    input: {
      padding: '8px',
    },
    button: {
      padding: '8px',
      fontSize: '0.875em',
    },
  },
  '@media (max-width: 480px)': {
    heading: {
      fontSize: '1em',
    },
    input: {
      padding: '6px',
    },
    button: {
      padding: '6px',
      fontSize: '0.75em',
    },
  },
};

export default ShipmentPage;
