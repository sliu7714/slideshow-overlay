// for heroku deployment

const express = require('express')
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, '/public')))

// app.use(express.static('public'))


app.get('/', (req, res) => {
    res.send('<a href="examples/examples.html">click here to go to the example html page</a>')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})