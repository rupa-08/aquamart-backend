const express = require("express");
const app = express();

const EventEmitter = require("events");
const myEvents = new EventEmitter();

app.use((req, res, callback) => {
  req.myEvents = myEvents;
  callback();
});

myEvents.on("signup", (data) => {
  console.log(data);
});

module.exports = app;
