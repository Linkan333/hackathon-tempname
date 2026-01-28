const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


app.use(session({
  secret: 'hackathon-temp-token',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 3000 }
}));

const difficulties = new Map();

difficulties.set("Easy", 1);
difficulties.set("Medium", 2);
difficulties.set("Hard", 3);


class Player {
  constructor(username) {
    this.username = username;
    this.experience = 0;
    this.currentLevel = 1;
    this.sessionId = null;
  }
  streakBegun() {
    let streak;
    streak += 1;
  };

  addXp(amount) {
    this.experience += amount;
    console.log(`${this.username} now has ${this.experience} XP`);
  }
}

/*class Level {
  constructor(username, experience, currentLevel) {
    this.username = username;
    this.experience = experience;
    this.currentLevel = currentLevel;
  }
  addXp(xp) {
      this.experience;
      this.experience += xp;
      console.log(`${this.username} now has ${this.experience} XP`);
  }
}*/


class Challenges {
  constructor(challengeName, challengeDifficulty, challengeAnswer) {
    this.challengeName = challengeName;
    this.challengeDifficulty = challengeDifficulty;
    this.challengeAnswer = challengeAnswer;
  }

  /*dayStreak(player) {

  }*/

  validateAnswer(userAnswer, player) {
    if (this.challengeAnswer.includes(userAnswer)) {
      const xp = difficulties.get(this.challengeDifficulty);
      let reward = 0;

      switch (xp) {
        case 1:
          reward = 25;
          break;
        case 2:
          reward = 60;
          break;
        case 3: 
          reward = 100;
          break;
      }


      player.addXp(reward);
      return true;
      //streakBegun(player);

    }
    return false;
  }
}


//const level1 = new Level("Daniel", 0);

/*const challenge1 = new Challenges(
  "Math Challenge",
  "Easy",
  ["42", "forty-two", "fortytwo"]
);*/

//console.log(challenge1.validateAnswer("43"));

//const challenge2 = new Challenges("Vilken färg är gräs", "Easy", ["42", "forty-two", "Forty Two"]);
//const result = challenge2.validateAnswer("42");
//console.log("Challenge result: ", result);
//level1.addXp(result);



const players = new Map();
var challenges = [];




app.post('/create-challenge', (req, res) => {
  const { challengeName, challengeDifficulty, challengeAnswer } = req.body;

  if (!challengeName || !challengeDifficulty || !challengeAnswer) {
    return res.status(400).send("Missing fields");
  }


  const answersArray = challengeAnswer.split(",").map(a => a.trim());


  const challenge = new Challenges(
    challengeName,
    challengeDifficulty,
    answersArray
  );

  challenges.push(challenge);

  fs.writeFile("challenges.json", JSON.stringify(challenges, null, 2), (err) => {
    if (err) {
      console.error("Error saving challenges: ", err);
    } else {
      console.log("Challenge saved to challenges.json")
    }
  });

  res.send({
    message: "Challenge created",
    challenge
  });
});


app.get('/create-challenge', (req, res) => {

  res.sendFile(__dirname + '/public/create.html');
});

app.get('/challenges', (req, res) => {
  res.sendFile(__dirname + '/public/challenges.html');
});


app.get('/login', (req, res) => {
  res.sendFile(__dirname + "/public/login/login.html");
})

app.post('/login', (req, res) => {
  const { username } = req.body;

  if (!username) return res.send("Username required");


  if (!req.session.player) {
    const player = new Player(username);
    player.sessionId = req.sessionID;
    req.session.player = player;
  }

  res.send({
    message: "Player logged in",
    player: req.session.player
  });
});





app.listen(port, () => {
  console.log(`${port}`);
});
