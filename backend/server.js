const express = require('express');
const bodyParser = require('body-parser');
const cryptoJS = require('crypto-js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT ||5000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

let playerBalance = 1000; // Initial player balance
let nonce = 0; // Initialize nonce

// Root route for testing
app.get('/', (req, res) => {
  res.send('Backend Server is running');
});

// Endpoint to roll the dice
app.post('/roll-dice', (req, res) => {
  const { betAmount } = req.body;

  if (betAmount <= 0 || betAmount > playerBalance) {
    return res.status(400).json({ error: 'Invalid bet amount' });
  }

  // Generate a random number between 1 and 6
  const roll = Math.floor(Math.random() * 6) + 1;
  let payout = 0;

  if (roll >= 4) {
    payout = betAmount * 2;
    playerBalance += payout;
  } else {
    playerBalance -= betAmount;
  }

  // Generate a provably fair hash
  const serverSeed = cryptoJS.SHA256(Date.now().toString()).toString(cryptoJS.enc.Hex);
  const clientSeed = cryptoJS.SHA256(Math.random().toString()).toString(cryptoJS.enc.Hex);
  const combinedSeed = cryptoJS.SHA256(`${serverSeed}${clientSeed}`).toString(cryptoJS.enc.Hex);
  const hash = cryptoJS.SHA256(combinedSeed).toString(cryptoJS.enc.Hex);

  // Increment the nonce
  nonce++;

  res.json({
    roll,
    payout,
    playerBalance,
    serverSeed,
    clientSeed,
    nonce,
    hash
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});