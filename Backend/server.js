const express = require("express");
const routes = require("./routes");

const app = express();
const port = 3000;


app.use(express.json());
var cors = require('cors')
app.use(cors())

app.use("/users", routes); 


app.listen(port, () => console.log('listining port ' + port));
