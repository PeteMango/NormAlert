require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'olympihacks',
    user: 'normanchen',
    password: process.env.POSTGRES_PWRD,
});

const { Configuration, OpenAIApi } = require("openai");
// const { c } = require("tar");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  mapKey: process.env.GOOGLE_MAPS_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world, from olympihacks");
});

const getDistance = async (
  originLat,
  originLng,
  destinationLat,
  destinationLng
) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destinationLat},${destinationLng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const distance = response.data.routes[0].legs[0].distance.text;
    return distance;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Unable to calculate distance");
  }
};

const getDuration = async (
  originLat,
  originLng,
  destinationLat,
  destinationLng
) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destinationLat},${destinationLng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const duration = response.data.routes[0].legs[0].duration.text;
    return duration;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Unable to calculate duration");
  }
};

const getCurrentLocation = async () => {
  try {
    const response = await axios.post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const { lat, lng } = response.data.location;
    console.log({ lat, lng });
    return { latitude: lat, longitude: lng };
  } catch (error) {
    console.error("Error getting user location:", error);
    throw new Error("Unable to get user location");
  }
};

app.get("/api/googlemaps/currentLocation", async (req, res) => {
  try {
    const userLocation = await getCurrentLocation();
    res.json(userLocation);
  } catch (error) {
    console.error("Error getting user location:", error);
    res.status(500).send("Error getting user location");
  }
});

app.get("/distance", async (req, res) => {
  try {
    const distance = await getDistance(
      43.473103561471284,
      -80.53983501505313,
      43.66258746771611,
      -79.39603676128505
    );

    res.status(200).json({ distance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/duration", async (req, res) => {
  try {
    const origin = "New York, NY";
    const destination = "San Francisco, CA";

    const duration = await getDuration(origin, destination);

    res.status(200).json({ duration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/distanceTo/:destination", async (req, res) => {
  try {
    const userLocation = await getCurrentLocation();

    console.log(userLocation);

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

      res.status(200).json({ distance, duration });
    } else {
      throw new Error("Invalid destination address");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/first-aid", async (req, res) => {
  try {
    const { message, context } = req.body;
    context.push({ role: "user", message: message });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "you are a bot that provides the user essential first aid advice. Please find chat history in the assistant role content to respond to the best of your ability.",
        },
        { role: "user", content: message },
        { role: "assistant", content: toString(context) },
      ],
    });

    const response = completion.data.choices[0].message.content;
    context.push({ role: "openAI", message: response });

    const add = {
      ...completion.data.choices[0],
      context: context,
    };

    res.status(200).json(add);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/api/test/postgres", (req, res) => {
    db.any('SELECT * FROM users')
    .then(data => {
        res.status(200).send(data);
        // res.send("hello");
    })
    .catch(error => {
        console.log(error);
        res.status(500).send("error retrieving data");
    });
});
 // comment
// psql
// create database olympihacks
// \c olympihacks
// CREATE TABLE users (                                                                                  id serial NOT NULL,                                                                                             username character varying(255) NOT NULL,                                                                       email character varying(255) NOT NULL,                                                                          password_hash character varying(255) NOT NULL,                                                                  created_at timestamp without time zone DEFAULT now(),                                                       name text not null);
// INSERT INTO users (username, email, password_hash, name) VALUES ('johnDoe', 'johndoe@example.com', 'hashedPassword123', 'John Doe');