import express from "express";
import cors from "cors";
import { connect } from "./Db/db.js";
import taskEndpoints from "./Models/tasks.js";


const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

// connect to DB
connect();

// register endpoints
taskEndpoints(app);

app.get("/", (_, res) => {
  console.log("Console Tag");
  res.send("Server is running...");
});

app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
