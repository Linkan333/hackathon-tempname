const fs = require('fs');

/*function testing() {
  fs.readFile("generated_questions.json", "utf-8", (err, data) => {
    (err) ? res.send({ error: err }) : obj = JSON.parse(data);
    console.log(obj);


    let length = Object.keys(obj).length;
    for (let i = 0; i < length; i++) {
      console.log(obj[i].id);
      console.log(obj[i].question);
    }
  })
}*/


function testing() {
  const a = "Hello, i am linus";
  const b = "whah adhahdhw adhahddh";

  console.log(a);

  const stringed = JSON.stringify(a);
  console.log(stringed);
}

testing()




