const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


const difficulties = new Map();

difficulties.set("Easy", 1);
difficulties.set("Medium", 2);
difficulties.set("Hard", 3);


class Level {
  constructor(username, experience, currentLevel) {
    this.username = username;
    this.experience = experience;
    this.currentLevel = currentLevel;
  }
  addXp(xp) {
    if () {
      this.experience;
      this.experience += xp;
      console.log(`${this.username} now has ${this.experience} XP`);
    }
  }
}


class Challenges {
  constructor(challengeName, challengeDifficulty, challengeAnswer) {
    this.challengeName = challengeName;
    this.challengeDifficulty = challengeDifficulty;
    this.challengeAnswer = challengeAnswer;
  }
  validateAnswer(userAnswer) {
    if (this.challengeAnswer.includes(userAnswer)) {
      let levels = [difficulties.values()];
      switch (levels) {
        case 1:
          Level.addXp(25); 
          break;
        case 2:
          Level.addXp(50);
          break;
        case 3:
          Level.addXp(100);
          break;
      }
    //return this.challengeAnswer.includes(userAnswer);
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




app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login/login.html');
});

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  res.send(`Username: ${username} & Password: ${password}`);
});


app.listen(port, () => {
  console.log(`${port}`);
});
