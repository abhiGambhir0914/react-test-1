const express = require('express');
const Pusher = require('pusher');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 9090;

app.use(cors());

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var pusher = new Pusher({
  appId: '472598',
  key: '1003a01bb71cf14762c1',
  secret: 'df8bff3417e1926596e7',
  cluster: 'ap2',
  authEndpoint: 'localost:8080/pusher/auth',
  encrypted: true
});

var userID = 0;

app.post('/message', (req,res)=>{
  const payload = req.body;
  // var socketId = req.body.socket_id;
  pusher.trigger('chat','message', payload);
  res.send(payload);
});


//authenticating and getting user's information
app.post('/pusher/auth', (req,res)=>{
  var socketID = req.body.socket_id;
  var channel = req.body.channel_name;

  var presenseData = {
    user_id:userID,
    user_info: {
      name: req.body.username
    }
  }

  var auth = pusher.authenticate(socketID, channel, presenceData);
  console.log("user logged in");
  userID = userID + 1;
  res.send(auth);
});



app.listen(port, () => console.log(`Listening on port ${port}`));
