const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3400 ;
const cors = require('cors');

require('./src/db/connection')
// const {uploadImages} = require('./controllers/upload.controller')
const projectRouter = require('./src/routes/projects.route')
const contactRouter = require('./src/routes/contact.routes')
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(cors({
    "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}))

app.use('/api',projectRouter);
app.use('/api',contactRouter)


app.get('/', (req, res) => {
    res.status(200).send("hello world");
    console.log("hello world");
})
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})