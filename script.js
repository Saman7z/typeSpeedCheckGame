//! var declrations
const input = document.getElementById("input-box");
const score = document.getElementById("score");
const time = document.getElementById("time");
const wordBox = document.querySelector(".word");
const testPart = document.querySelector(".test-section");
const scorePart = document.querySelector(".scores-container");
const timePart = document.querySelector(".time-container");
const startBtn = document.getElementById("start-btn");
const diffLevel = document.getElementById("selectDifficulty");
words = [
  "drag",
  "visualization",
  "laboratory",
  "sequenced",
  "leucopus",
  "intermediate",
  "respiration",
  "reproduction",
  "anogenital",
  "accomplished",
  "sequencing",
  "complications",
  "cellular",
  "pentraxins",
  "blood",
  "approximately",
  "lipopolysaccharide",
  "mutation",
  "substances",
  "toxins",
  "document",
  "javascript",
  "vscode",
  "coder",
  "programmer",
  "teacher",
  "trump",
  "twitter",
  "overclock",
  "samsung",
  "iphone",
  "apple",
  "asus",
  "saman",
  "github",
  "repository",
  "iran",
];

//! functions
//init functions
//const initFunctions = (e) => {
  
//}

//randomWordGenerator function

const randomWordGenerator = () => {
  let word = words[Math.floor(Math.random() * words.length)];
  return word;
};

// COG Toggle function
const ToggleDifficulty = () => {
  document
    .querySelector(".difficulty-container")
    .classList.toggle("hide-difficulty-section");
};
// setDifficulty function 
const setDiff = (e,firstTime=false) => {
  if (firstTime) {
    localStorage.setItem("diff", 'medium')
  }else{
    localStorage.setItem("diff", e.target.value)

  }
}
// add Score function
const addScore = () => {
  let scoreNum = Number(score.innerText);
  //let diff = localStorage.getItem("diff");
  // if(diff == "easy"){

  // }else if (diff== "medium"){
  //   scoreNum = scoreNum +3;
  // }else{
  //   scoreNum = scoreNum +1;

  // }
  scoreNum++
  score.innerText = scoreNum;
  //console.log(scoreNum)
};
// changeTheUI function
const changeTheUI = (word) => {
  wordBox.innerText = word;
  input.focus();
  startBtn.style.display = "none";
  scorePart.style.display = "flex";
  timePart.style.display = "flex";
  testPart.style.display = "flex";
};
//gameOver func
const gameOver = () => {
  //reloadBtn.style.display = "none";
  scorePart.style.display = "flex";
  timePart.style.display = "none";
  testPart.style.display = "none";
  document.querySelector(".test-sec-container").innerHTML = `
  <h1>Game Over</h1>
  <h3 class="game-mode">mode : <span style='font-weight:bold;color:red;text-transform: capitalize;'>${localStorage.getItem("diff")}</span></h3>
  <button id="reload-btn">Reaload</button>
  `;
  document.getElementById("reload-btn").addEventListener("click", ()=> location.reload())
}
// timeFunction
const timeFunction = () => {
  let intervalItem = setInterval(() => {
    let leftTime = Number(time.innerText);
    leftTime--;
    if(Number(document.getElementById("time").innerText) == 0 ){
      clearInterval(intervalItem)
      gameOver()
    }
    time.innerText= leftTime;

  },1111)
}
// checkWord function
const checkWord = (e, randomWord, firstTime = false) => {
  if (firstTime) {
    word = randomWord;
  } else {
    word = word;
  }
  let hardness = localStorage.getItem("diff")
  if (hardness == "hard") {
    hardnessTime = 10
  } else if (hardness == "medium"){
    hardnessTime = 15
  }else{
    hardnessTime = 20
  }
  if (e != undefined) {
    if (e.target.value == word.toLowerCase()) {
      let theTimeleft = time.innerText;
      time.innerText = Number(theTimeleft)+hardnessTime
      e.target.value = "";
      document.getElementById("bonus").innerText = hardnessTime;
      document.querySelector(".bonus-container").style.display= "block";
      setTimeout(()=> document.querySelector(".bonus-container").style.display= "none", 1500)
      startTheGame();
      addScore();
    }
  }

  //console.log(e.target.value, randomWord);
};
// Start Game function
const startTheGame = (e) => {
  let randomWord = randomWordGenerator();
  changeTheUI(randomWord);
  checkWord(e, randomWord, true);
  timeFunction()
  //console.log(randomWord + "start")
  //checkWord(randomWord)
  //console.log(randomWord)
};
//! Event Listeners
// COG Toggle event
document
  .querySelector(".setting-container")
  .addEventListener("click", ToggleDifficulty);

// Start Game event
startBtn.addEventListener("click", startTheGame);

//input enter
input.addEventListener("input", checkWord);

//difficulty changed
diffLevel.addEventListener("change", setDiff)

//page REload

//window.addEventListener("load", initFunctions)
//

let difficultyStorage = localStorage.getItem("diff");
if(difficultyStorage != null){
  diffLevel.value = difficultyStorage
}else{
  setDiff('e', true)
}
//console.log(difficultyStorage)
//
//console.log()