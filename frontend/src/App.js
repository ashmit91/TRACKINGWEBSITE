import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrackingNavbar from './components/TrackingNavbar';
import SenderForm from './components/SenderForm';
import ReceiverForm from './components/ReceiverForm';
import ShipmentForm from './components/ShipmentForm';
import BarcodeGenerator from './components/BarcodeGenerator';
import Details from './components/Details';
import TrackerSteps from './components/TrackerSteps';

function App() {
  return (
    <Router> {/* Only one Router */}
      <TrackingNavbar />
      <TrackerSteps />
      <Routes>
        <Route path="/sender" element={<SenderForm />} />
        <Route path="/receiver" element={<ReceiverForm />} />
        <Route path="/shipment" element={<ShipmentForm />} />
        <Route path="/tracker" element={<BarcodeGenerator />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
