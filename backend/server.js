import express from "express";
import cors from "cors";
import router from "./routes/routes.js"

import path from "path";
import { fileURLToPath } from "url";

//Alternative approach to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(express.static(path.join(__dirname, '/frontend/build')));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
})
app.get('/', (req, res) => {
  res.send("<h1> Checking </h1>")
});



app.listen(PORT, () => {
  console.log("Server running at ", PORT);
});