const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Defining the different xp levels and how much xp you get from certain challenges.
const experience = new Map();

async function dailyChallenges() {
  // not yet implemented
}

app.get('/levels', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/levels.html'))
});

const challenges = [];

challenges.push("123", "124", "125")
experience.set(challenges[0], 100);
experience.set(challenges[1], 90);
experience.set(challenges[2], 100);




/*app.get('/', (req, res) => {
  console.log([...experience.keys()]);
  first = experience.get(challenges[0]);
  second = experience.get(challenges[1]);
  third = experience.get(challenges[2]);

  console.log(3 + "33");
  console.log(3 + 3);
  console.log(first, second, third);
});*/




app.listen(port, () => {
  console.log(`${port}`)
})
