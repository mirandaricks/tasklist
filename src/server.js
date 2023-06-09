const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const PORT = 8555;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
