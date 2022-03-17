const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const chatRoutes = require("./routes/ChatRoutes");
const messageRoutes = require("./routes/MessageRoutes");

const app = express();


app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Connect to database:
const dbUsername = "username12345";
const dbPassword = "password12345";
const clusterName = "AccordCluster1";
const dbURL = "mongodb+srv://" + dbUsername + ":" + dbPassword + 
              "@accordcluster1.sv3wm.mongodb.net/" + clusterName + "?retryWrites=true&w=majority";
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Successfully Connected"))
    .catch((err) => console.log(err));

const server = app.listen(8000, console.log("Server is running on http://localhost:8000"));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000"
    }
  });
  
io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
        socket.join(userData._id);
    });

    socket.on("join chat", (room) => {
        socket.join(room);
    });

    socket.off("setup", () => {
        socket.leave(userData._id);
    });
});