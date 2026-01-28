const difficulties = new Map();


difficulties.set("Easy", 1);

let level1 = [...difficulties.values()];
if (level1[0] == 1) {
  console.log("True")
} else {
  return false;
}
console.log(level1)
