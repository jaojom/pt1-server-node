const express = require('express');
const app = express()
app.use(express.json())

// Middleware
const logger = (req, res, next) => {
  console.log('logged' + new Date().toISOString())
  next();
}

app.use(logger);


app.get("/hello", (req, res) => {
  res.json({ message: "Hello" })
});

app.get("/hello/:msg", (req, res) => {
  try {
    console.log("req.params", req.params)
    const { msg } = req.params;
    res.json({ message: `Hello: ${msg}` })
  } catch (error) {
    console.log(error)
    res.json({ message: "Error query hello" })
  }

});


app.listen(5000, () => {
  console.log("server is running port 5000")
});
