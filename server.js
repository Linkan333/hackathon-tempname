require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const { OpenAI } = require("openai");
const fs = require('fs');
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


// global deklarering av env grejer
const api = process.env.OPENAI_API_KEY;


app.use(session({
  secret: 'hackathon-temp-token',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 3000 }
}));

app.use('/assets', express.static('assets'));
app.use('/challenge-assets', express.static('challenge-assets'));

const difficulties = new Map();

difficulties.set("Easy", 1);
difficulties.set("Medium", 2);
difficulties.set("Hard", 3);



const levelThresholds = new Map();

levelThresholds.set(
  "1", 50
);

levelThresholds.set(
  "2", 100
);

levelThresholds.set(
  "3", 150
);

levelThresholds.set(
  "4", 200
);

levelThresholds.set(
  "5", 500
);




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

    this.checkLevelUp();
  }

  checkLevelUp() {
    const nextLevel = (this.currentLevel + 1).toString();
    const threshold = levelThresholds.get(nextLevel);

    if (threshold && this.experience >= threshold) {
      thus.currentLevel++;
      console.log(`${this.username} leveled up to level ${this.currentLevel}`);


      this.checkLevelUp();
    }
  }


  getLevelProgress() {
    const nextLevel = (this.currentLevel + 1).toString();
    const nextThreshold = levelThresholds.get(nextLevel);


    if (!nextThreshold) {
      return { level: this.currentLevel, progress: "MAX LEVEL" };
    }

    const currentThreshold = levelThresholds.get(this.currentLevel.toString()) || 0;
    const progressInLevel = this.experience - currentThreshold;
    const xpNeededForNext = nextThreshold - currentThreshold;
    const percentComplete = (progressInLevel / xpNeededForNext) * 100;


    return {
      level: this.currentLevel,
      xp: this.experience,
      nextLevelAt: nextThreshold,
      xpToNext: nextThreshold - this.experience,
      percentComplete: Math.round(percentComplete)
    };
  }
}



app.get('/get_question', (req, res) => {
  const miniGame = req.query.mini_game;
  const question = req.query.question;

  fs.readFile("challenges.json", "utf-8", (err, data) => {
    if (err) {
      res.send("Could not read file")
    }

    res.send(data);
  });

  //res.send(data);
})

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

      // making the logic to depend on if the reward for the xp has overgone an threshold
      // we are going to make it update the levels.
      
      //levelThresholds = new Map();

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
var challenges = []


const openai = new OpenAI({
  apiKey: api,
});


const subjects = [
  { id: 1, subject: "Fysik" },
  { id: 2, subject: "Matte" },
  { id: 3, subject: "Kemi" },
  { id: 4, subject: "Programmering" },
  { id: 5, subject: "Engelska" }
];

const difficulty = [
  { id: 1, difficulty: "Easy" },
  { id: 2, difficulty: "Medium" },
  { id: 3, difficulty: "Hard" },
];

/*const response = openai.responses.create({
  model: 'gpt-5-nano',
  input: 'ge mig 10 frågor skriv i json format.',
  store: true,
});

const result = response.output_text;*/


app.post('/challenges/flashcards/')


async function storeQuestionsBasedOnSubject() {
  const response = openai.responses.create({
    model: 'gpt-5-nano',
    input: 'ge mig 10 frågor skriv i json format. Det ska vara i format {id: int, "question": "string"}',
    store: true,
  });

  fs.writeFile("generated_questions.json", ((await response).output_text), 'utf-8', (err) => {
    if (err) {
      return res.status(404).send({ error: "Fuck you!" });
    }
  });
}

storeQuestionsBasedOnSubject();

/*const flashcardQuestions = [
  { id: 1, question: "Vad är 2+2", answer: "4" },
  { id: 2, question: "Vad är huvudstaden i Sverige", answer: "Stockholm" },
  { id: 3, question: "Vad är 10 * 5", answer: "50" },
  { id: 4, question: "Vilket år upptäcktes Amerika?", answer: "1492" },
  { id: 5, question: "Vad är 100 / 4", answer: "25" }
];*/

app.get('/player-progress', (req, res) => {
  if (!req.session.player) {
    return res.status(401).send({ error: "Not logged in" });
  }

  const player = req.session.player;
  const progress = player.getLevelProgress();

  res.send({
    username: player.username,
    ...progress
  });
});



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


app.get('/challenges/:challengeName', (req, res) => {
  const challengeName = req.params.challengeName;


  if (req.params.challengeName === "flashcards") {
    res.sendFile(__dirname + '/challenges/flash-cards.html');
  }
});


app.get('/challenges/flashcards/questions/:id', (req, res) => {
  const questionId = parseInt(req.params.id);
  //const question = flashcardQuestions.find(q => q.id === questionId);

  const question = fs.readFile("generated_questions.json", "utf-8", (err, data) => {
    (err) ? res.send({ error: err }) : obj = JSON.parse(data);
    console.log(obj);

    let length = Object.keys(obj).length;
    for (let i = 0; i < length; i++) {
      console.log(obj[i].id);
    }
  })

  if (question) {
    res.json(question);
  } else {
    res.status(404).json({ error: "Fråga hittades inte" });
  }
});

app.get('/create-challenge', (req, res) => {

  res.sendFile(__dirname + '/public/create.html');
});

app.get('/challenges', (req, res) => {
  res.sendFile(__dirname + '/public/challenges.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.get('/nope', (req, res) => {
  res.send("<h1>Trodde du allvarligt att vi orkar skriva en <strong>läs mer...</strong></h1>");
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + "/public/login/login.html");
});

app.get('/accomplishment', (req, res) => {

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
