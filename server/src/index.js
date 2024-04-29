const config = require('./utils/config');
const express = require('express');
const cors = require('cors');
const app = express();

const characterRoutes = require('./routes/characterRoutes');

/***** MIDDLEWARES & ROUTES *****/
app.use(cors());
app.use(characterRoutes);

app.get('/', (req, res) => { 
    res.status(300).redirect('/characters');
});

// envoi d'une image test - PicturePage
app.get('/picture', (req, res) => {
    res.status(200).sendFile(__dirname + '/assets/characters/Mario/whatever.jpeg');
})

app.listen(config.PORT, () => { console.log(`Listening on port ${config.PORT}`) })


