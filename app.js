const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on('connected', ()=>{
    console.log('Connected to mongodb successfully');
});

mongoose.connection.on('error', (err)=>{
    console.log('Database Error ' + err);
});

const users = require('./routes/users')

const port = 3000;

app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());


app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport);

app.use('/users/', users);

app.get('/', (req, res)=>{
    res.send('Invalid Endpoint');
});

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.listen(port, ()=>{
    console.log('Now listening on port ' + port);
});