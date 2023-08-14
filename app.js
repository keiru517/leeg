const express = require('express');
const league = require('./routes/league');


const app = express();
const port = 5000;

app.get('/', (req, res)=> {
    res.send('Hello world!')
})

app.use('/api/league', league);

app.listen(port, () => {
    console.log(`Example app is running on port ${port}`)
});

