import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TrackerSteps = () => {
  const location = useLocation();

  const [completedSections, setCompletedSections] = useState({
    sender: false,
    receiver: false,
    shipment: false,
    tracker: false,
  });

  const checkCompletedSections = () => {
    const senderData = localStorage.getItem('sender');
    const receiverData = localStorage.getItem('receiver');
    const shipmentData = localStorage.getItem('shipment');

    setCompletedSections({
      sender: Boolean(senderData),
      receiver: Boolean(receiverData),
      shipment: Boolean(shipmentData),
      tracker: Boolean(senderData && receiverData && shipmentData),
    });
  };

  useEffect(() => {
    checkCompletedSections();
  }, [location.pathname]);

  return (
    <div className="form-steps" style={styles.formSteps}>
      <ul className="nav" style={styles.stepsList}>
        {/* Sender Step */}
        <li className="nav-item" style={styles.stepItem}>
          <div style={styles.line}></div>
          <Link
            className="nav-link"
            to="/sender"
            style={{
              color: completedSections.sender ? 'brown' : 'blue',
              padding: '5px 10px',
              textDecoration: 'none',
              fontWeight: '500',
            }}
          >
            Sender
          </Link>
        </li>

        {/* Receiver Step */}
        <li className="nav-item" style={styles.stepItem}>
          <div style={styles.line}></div>
          <Link
            className="nav-link"
            to="/receiver"
            style={{
              color: completedSections.receiver ? 'brown' : 'blue',
              padding: '5px 10px',
              textDecoration: 'none',
              fontWeight: '500',
            }}
          >
            Receiver
          </Link>
        </li>

        {/* Shipment Step */}
        <li className="nav-item" style={styles.stepItem}>
          <div style={styles.line}></div>
          <Link
            className="nav-link"
            to="/shipment"
            style={{
              color: completedSections.shipment ? 'brown' : 'blue',
              padding: '5px 10px',
              textDecoration: 'none',
              fontWeight: '500',
            }}
          >
            Shipment
          </Link>
        </li>

        {/* Tracker Step */}
        <li className="nav-item" style={styles.stepItem}>
          <div style={styles.line}></div>
          <Link
            className="nav-link"
            to="/tracker"
            style={{
              color: completedSections.tracker ? 'brown' : 'brown',
              padding: '5px 10px',
              textDecoration: 'none',
              fontWeight: '500',
            }}
          >
            Tracker
          </Link>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  formSteps: {
    padding: '15px',
    backgroundColor: '#f9f9f9',
    border: '2px solid #ddd',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    position: 'absolute',
    top: '100px',
    right: '10px',
    width: '200px',
    boxSizing: 'border-box',
    // Responsive width adjustment for smaller screens
    '@media (max-width: 768px)': {
      width: '150px',
      right: '5px',
      padding: '10px',
    },
    '@media (max-width: 480px)': {
      width: '100px',
      right: '2px',
      padding: '5px',
    },
  },
  stepsList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  stepItem: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  line: {
    position: 'absolute',
    left: '50%',
    width: '2px',
    height: '100%',
    backgroundColor: '#ddd',
    zIndex: -1,
  },
};

export default TrackerSteps;
