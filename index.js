const express =require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/database');
const passport = require('passport');
const users = require('./routes/users');
const stylelists = require('./routes/stylelists');
const app = express();


mongoose.connect(config.database,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.once('open', function(){
  console.log('DB connected');
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/stylelists', stylelists );

app.get('/', (req, res, next) => {
    res.send('Invalid Endpoint');
});


app.listen(port, () => {
    console.log('Server started on port '+ port)
});
