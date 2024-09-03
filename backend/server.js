const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/trackingdata', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

const dataSchema = new mongoose.Schema({
  sender: {
    name: String,
    mobile: String,
    address: String
  },
  receiver: {
    name: String,
    mobile: String,
    address: String
  },
  shipment: {
    order: String,
    orderDate: String,
    orderPlaced: String,
    deliveryDate: String
  }
});

const Data = mongoose.model('Data', dataSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/api/saveDetails', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    await Data.deleteMany(); // Clear existing data
    const newData = new Data(req.body);
    await newData.save();
    res.status(200).send('Details saved successfully');
  } catch (error) {
    console.error('Error saving data:', error.message);
    res.status(500).send('Error saving data');
  }
});


app.get('/api/details', async (req, res) => {
  try {
    const data = await Data.findOne(); // Fetch the first record in the database
    res.status(200).json(data); // Send the fetched data to the frontend
  } catch (error) {
    console.error('Error fetching details:', error.message);
    res.status(500).send('Error fetching details');
  }
});


app.listen(5000, () => console.log('Server running on port 5000'));
