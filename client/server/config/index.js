import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import firebaseAdmin from "firebase-admin";
import dotenv from "dotenv";
import routes from "./routes.js";
import { handleSocket } from "./socket.js";
import serviceAccount from "./config/firebaseConfig.json";
const app = express();
const server = http.createServer(app);
const io = new Server(server);
dotenv.config();
app.use(express.json());

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

mongoose.connect("mongodb://localhost:27017/taskmanager", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use("/api", routes);

io.on("connection", (socket) => handleSocket(socket, io));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
