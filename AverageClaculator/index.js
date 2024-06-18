const express = require('express')
const cors=require('cors');
const app = express()
const router=require('./routes/route')
require('dotenv').config();
const port = 9876
app.use(cors());
app.use(express.json());
app.use(router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))