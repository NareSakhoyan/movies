const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000
const userRoutes = require('./routes/user.routes')

const corsOptions = {
    'origin': 'localhost:8080'
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.json({message: 'Welcome'})
})

userRoutes(app)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})