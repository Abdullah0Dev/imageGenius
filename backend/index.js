const express = require('express');
const generateImageRoute = require('./routes/generateImageRoute')

const app = express();

// middlewares
app.use(express.json());
// middleware to log API requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// routes
app.get('/', (req, res) => res.send("Hello from API")  )
app.use('/api/generate', generateImageRoute ) // -> generate image route /api/generate/



// run the app
app.listen(4000, () => {
    console.log("The Server is Running on Port 4000")
})
// localhost:4000/

