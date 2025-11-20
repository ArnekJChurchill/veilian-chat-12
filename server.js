const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Pusher config
const pusher = new Pusher({
  appId: "2080160",
  key: "b7d05dcc13df522efbbc",
  secret: "4064ce2fc0ac5596d506",
  cluster: "us2",
  useTLS: true
});

// Endpoint to send messages
app.post('/message', (req, res) => {
  const { displayName, message } = req.body;
  if (!displayName || !message) return res.status(400).send("Missing fields");

  pusher.trigger("Veilian-CHAT-Z8", "new-message", { displayName, message });
  res.status(200).send("Message sent");
});

// Serve static files
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Veilian Chat 12 running on port ${PORT}`));
