// for heroku deployment

const express = require('express')
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, '/public')))


app.get('/', (req, res) => {
    res.redirect('/examples/landingPage.html')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})