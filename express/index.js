require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const pgp = require('pg-promise')();
const db = pgp({
  host: 'localhost',
  port: 5433,
  database: 'petemango',
  user: 'petemango',
  password: process.env.POSTGRES_PWRD,
});


const { Configuration, OpenAIApi } = require('openai');
const { c } = require('tar');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  mapKey: process.env.GOOGLE_MAPS_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world, from olympihacks');
});

const getDistance = async (origin, destinationLat, destinationLng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destinationLat},${destinationLng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const distance = response.data.routes[0].legs[0].distance.text;
    return distance;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Unable to calculate distance');
  }
};

const getDuration = async (origin, destinationLat, destinationLng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destinationLat},${destinationLng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const duration = response.data.routes[0].legs[0].duration.text;
    return duration;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Unable to calculate duration');
  }
};

const getCurrentLocation = async () => {
  try {
    const response = await axios.post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const { lat, lng } = response.data.location;
    console.log('Current Location:', { lat, lng });
    return { latitude: lat, longitude: lng };
  } catch (error) {
    console.error('Error getting user location:', error);
    throw new Error('Unable to get user location');
  }
};

app.get('/api/googlemaps/currentLocation', async (req, res) => {
  try {
    const userLocation = await getCurrentLocation();
    res.json(userLocation);
  } catch (error) {
    console.error('Error getting user location:', error);
    res.status(500).send('Error getting user location');
  }
});

app.get('/distanceTo/:destination', async (req, res) => {
  try {
    const userLocation = await getCurrentLocation();
    console.log('User Location:', userLocation);

    const destination = req.params.destination;
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      destination
    )}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const geocodingResponse = await axios.get(geocodingUrl);
    const results = geocodingResponse.data.results;

    if (results.length > 0) {
      const destinationLocation = results[0].geometry.location;
      const destinationLat = destinationLocation.lat;
      const destinationLng = destinationLocation.lng;

      const distance = await getDistance(
        userLocation.latitude,
        userLocation.longitude,
        destinationLat,
        destinationLng
      );
      const duration = await getDuration(
        userLocation.latitude,
        userLocation.longitude,
        destinationLat,
        destinationLng
      );

      console.log('Driving Distance to', destination, ':', distance);
      console.log('Driving Duration to', destination, ':', duration);

      res.status(200).json({ distance, duration });
    } else {
      throw new Error('Invalid destination address');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/first-aid', async (req, res) => {
  try {
    const { message, context } = req.body;
    context.push({ role: 'user', message: message });

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'you are a bot that provides the user essential first aid advice. Please find chat history in the assistant role content to respond to the best of your ability.',
        },
        { role: 'user', content: message },
        { role: 'assistant', content: toString(context) },
      ],
    });

    const response = completion.data.choices[0].message.content;
    context.push({ role: 'openAI', message: response });

    const add = {
      ...completion.data.choices[0],
      context: context,
    };

    res.status(200).json(add);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/drivingDistance/:origin', async (req, res) => {
  try {
    const origin = req.params.origin;
    const userLocation = await getCurrentLocation();

    const distance = await getDistance(origin, userLocation.latitude, userLocation.longitude);

    console.log('Driving Distance:', distance);

    res.status(200).json({ distance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/drivingTime/:origin', async (req, res) => {
  try {
    const { origin } = req.params;
    const userLocation = await getCurrentLocation();
    const destination = `${userLocation.latitude},${userLocation.longitude}`;

    const duration = await getDuration(origin, userLocation.latitude, userLocation.longitude);

    console.log('Driving Duration:', duration);

    res.status(200).json({ duration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/test/nearby', (req, res) => {
  db.any('SELECT * FROM locations')
    .then((data) => {
      const locations = data.map((location) => ({
        latitude: location.latitude,
        longitude: location.longitude,
      }));
      res.status(200).json(locations);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error retrieving data');
    });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
