import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator = () => {
  const [barcode, setBarcode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedSender = JSON.parse(localStorage.getItem('sender') || '{}');
    const savedReceiver = JSON.parse(localStorage.getItem('receiver') || '{}');
    const savedShipment = JSON.parse(localStorage.getItem('shipment') || '{}');

    if (savedSender.name && savedReceiver.name && savedShipment.order) {
      const barcodeData = `${savedSender.name}-${savedReceiver.name}-${savedShipment.order}`;
      setBarcode(barcodeData);
      JsBarcode('#barcode', barcodeData, { format: 'CODE128' });
    } else {
      alert('Please complete all previous forms.');
      navigate('/sender');
    }
  }, [navigate]);

  const handleSave = async () => {
    const sender = JSON.parse(localStorage.getItem('sender')) || {};
    const receiver = JSON.parse(localStorage.getItem('receiver')) || {};
    const shipment = JSON.parse(localStorage.getItem('shipment')) || {};

    try {
      const response = await fetch('http://localhost:5000/api/saveDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, receiver, shipment })
      });

      if (response.ok) {
        navigate('/details');
      } else {
        console.error('Failed to save data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDownload = () => {
    const svg = document.querySelector('#barcode');
    if (svg) {
      const svgString = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'barcode.png';
        link.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + window.btoa(svgString);
    } else {
      console.error('Barcode SVG not found');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Barcode Generator</h2>
      <div style={styles.barcodeContainer}>
        <svg id="barcode" style={styles.barcode}></svg>
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={handleSave} style={styles.button}>Save</button>
        <button onClick={handleDownload} style={styles.button}>Download Barcode</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '90%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    marginBottom: '20px', // Ensure it doesn't go below tracking page
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: '1.5em',
  },
  barcodeContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  barcode: {
    maxWidth: '100%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    flex: '1',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0 5px',
    fontSize: '1em',
  },
  '@media (max-width: 768px)': {
    container: {
      padding: '15px',
    },
    heading: {
      fontSize: '1.25em',
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
    button: {
      padding: '6px',
      fontSize: '0.75em',
    },
    buttonContainer: {
      flexDirection: 'column',
    },
    button: {
      marginBottom: '10px',
    },
  },
};

export default BarcodeGenerator;
