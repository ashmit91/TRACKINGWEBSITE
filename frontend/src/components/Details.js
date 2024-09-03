import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Details = () => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/details');
        setDetails(res.data); // Set the details from MongoDB
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };
    fetchDetails();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Details</h2>
      {details ? (
        <div style={styles.detailsContainer}>
          <div style={styles.section}>
            <h3 style={styles.sectionHeading}>Sender:</h3>
            <p style={styles.detail}>Name: {details.sender?.name || 'N/A'}</p>
            <p style={styles.detail}>Mobile: {details.sender?.mobile || 'N/A'}</p>
            <p style={styles.detail}>Address: {details.sender?.address || 'N/A'}</p>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionHeading}>Receiver:</h3>
            <p style={styles.detail}>Name: {details.receiver?.name || 'N/A'}</p>
            <p style={styles.detail}>Mobile: {details.receiver?.mobile || 'N/A'}</p>
            <p style={styles.detail}>Address: {details.receiver?.address || 'N/A'}</p>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionHeading}>Shipment:</h3>
            <p style={styles.detail}>Order: {details.shipment?.order || 'N/A'}</p>
            <p style={styles.detail}>Order Date: {details.shipment?.orderDate || 'N/A'}</p>
            <p style={styles.detail}>Order Placed: {details.shipment?.orderPlaced || 'N/A'}</p>
            <p style={styles.detail}>Delivery Date: {details.shipment?.deliveryDate || 'N/A'}</p>
          </div>

          <button style={styles.button}>Edit</button>
        </div>
      ) : (
        <p>Loading details...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '90%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: '1.5em',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    marginBottom: '20px',
  },
  sectionHeading: {
    fontSize: '1.2em',
    marginBottom: '10px',
    color: '#555',
  },
  detail: {
    marginBottom: '5px',
    fontSize: '1em',
    color: '#333',
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
  '@media (max-width: 768px)': {
    container: {
      padding: '15px',
    },
    heading: {
      fontSize: '1.25em',
    },
    detail: {
      fontSize: '0.9em',
    },
    button: {
      padding: '8px',
      fontSize: '0.875em',
    },
  },
  '@media (max-width: 480px)': {
    container: {
      padding: '10px',
    },
    heading: {
      fontSize: '1em',
    },
    detail: {
      fontSize: '0.75em',
    },
    button: {
      padding: '6px',
      fontSize: '0.75em',
    },
  },
};

export default Details;
