const connectToMongo = require("./db");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");
const cors = require("cors");

connectToMongo();

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.use("/api/user", userRoutes);
app.use("/api/notes", notesRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
