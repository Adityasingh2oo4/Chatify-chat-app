import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import MessageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from "./socket/socket.js";


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse the incoming requests with json payloads (from req.body)
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); // to parse cookies from the request object

app.use("/api/auth",authRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
    connectToMongoDB()
    console.log(`server Running on port ${PORT}`)
});