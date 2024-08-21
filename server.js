const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", taskRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
