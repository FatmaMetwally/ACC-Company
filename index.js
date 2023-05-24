const express = require('express')
const app = express()
const port=3000
app.use(express.json({ extended: false }))
app.use(express.urlencoded({ extended: false }))
const mongoose = require('mongoose');

app.use(require('./routes/information.route'))
mongoose.connect('mongodb+srv://admin:admin@cluster0.ewz604a.mongodb.net/ACC-Company-DB')
app.get('/', ( req, res) => 
{   console.log('Received request from: ' + req.ip)
    res.status(200).json({message:'Hello World!'})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))