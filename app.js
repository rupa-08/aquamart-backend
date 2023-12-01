const express = require("express");
const app = express();
var path = require("path");
const routes = require("./routes");
const events = require("./app/events/event");

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Client connected.");
});

app.use(events);

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/api/v1", routes);

app.use((req, res, callback) => {
  callback({
    status: 404,
    message: "Page not found!",
  });
});

// garbage collector or error handeling middleware
app.use((error, req, res, callback) => {
  let status_code = error.status || 500;
  let message = error.message || error;

  res.status(status_code).json({
    result: null,
    status: false,
    message: message,
  });
});

app.listen(9000, "127.0.0.1", (error) => {
  if (error) {
    console.log("Error listening to port 9000");
  } else {
    console.log("Server started.");
  }
});
