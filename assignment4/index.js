const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

/* Serve static files */
app.use(express.static('public'));

/* Dog breed → images mapping */
const dogImages = {
  beagle: ['beagle1.jpg', 'beagle2.jpg'],
  husky: ['husky1.jpg', 'husky2.jpg'],
  pug: ['pug1.jpg', 'pug2.jpg']
};

/* Utility: get random item from array */
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* GET /breeds */
app.get('/breeds', (req, res) => {
  res.json(Object.keys(dogImages));
});

/* GET /image/:breed */
app.get('/image/:breed', (req, res) => {
  const breed = req.params.breed.toLowerCase();

  if (!dogImages[breed]) {
    return res.status(404).json({ error: 'No such breed' });
  }

  const image = getRandomItem(dogImages[breed]);
  res.json({
    message: `/img/${image}`
  });
});

/* Start server */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});