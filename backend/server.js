import express from "express";
import cors from "cors";
import router from "./routes/routes.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get('/', (req, res)=>{
  res.send("<h1> Checking </h1>")
});

app.listen(PORT, ()=>{
  console.log("Server runnning at ", PORT);
});