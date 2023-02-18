const express = require("express");
const app = express();
const path = require("path");

const http = require("http").Server(app);
const port = process.env.port || 8080;

//attach http server to the socket.io
const io = require("socket.io")(http);

//route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

//create a new connection
io.on("connection", (socket) => {
  // 클라이언트의 connect 이벤트가 호출되면 동일한 socket.id를 출력한다.
  //   console.log(socket.id);
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("message", (msg) => {
    console.log("Client Message :" + msg);
  });

  //emit event
  socket.emit("server", "Receive From Server");
});

http.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
