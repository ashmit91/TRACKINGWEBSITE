import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = createRoot(document.getElementById('root')); // Get the root element
root.render(<App />); // Render the App component
