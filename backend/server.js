const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;
const dotenv = require("dotenv");
const Routes = require("./Routes/Router");

const app = express();


//middlewares
app.use(express.json());
app.use(cors())



dotenv.config();

//routes
app.use("/", Routes);

mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(() => console.log( 'MongoDB Connected' ))
  .catch(err => console.log( err ));

app.listen(port, () => {
 console.log(`Server is running on ${port}`)
});