const connectToMongo = require("./db");
var cors = require('cors')
const express = require("express");
const app = express();
const port = 5000;
// Connect to MongoDB
connectToMongo();
// Setting up middleware
app.use(cors())
app.use(express.json());
//Availabe routes setting up
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.listen(port, () => {
  console.log(`iNotebook backend app listening at http://localhost/${port}`);
});
