import http, { Server } from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import "./config/env.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);


connectDB();

server.listen(PORT, () => console.log ("server running on 5000"));