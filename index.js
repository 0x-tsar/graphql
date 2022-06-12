const express = require("express");
const app = express();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`);
});
