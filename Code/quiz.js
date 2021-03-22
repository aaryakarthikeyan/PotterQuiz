//Define some constants

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter= document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

//create questions

let questions = [
    {
        question : "Which house did harry potter belong to?",
        imgscr : "img/html.jpg",
        choiceA : "Gryffindor",
        choiceB : "Slytherin",
        choiceC : "Hufflepuff",
        correct : "A"
    },
    {
        question : "Who is the author who created the famous harry potter series?",
        imgscr : "img/js.jpg",
        choiceA : "Dan Brown",
        choiceB : "J.K Rowling",
        choiceC : "John Green",
        correct : "B"
    },
    {
        question : "What is the most dangerous spell from the wizarding world?",
        imgscr : "img/css.jpg",
        choiceA : "Diffindo",
        choiceB : "Expulso",
        choiceC : "Avada kedavra",
        correct : "C"
    }
];

//create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count=0;
const questionTime = 10; //10second
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score=0;

//render a question
function renderQuestion()
{
 let q = questions[runningQuestion];
 
 question.innerHTML = "<p>"+ q.question +"</p>";
 qImg.innerHTML = "<img src="+ q.imgscr +">";
 choiceA.innerHTML = q.choiceA;
 choiceB.innerHTML = q.choiceB;
 choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

function startQuiz()
{
        start.style.display = "none";
        renderQuestion();
        quiz.style.display = "block";
        renderProgress();
        renderCounter();
        TIMER = setInterval(renderCounter,1000); //call renderq for every one sec
}

//render progress
function renderProgress(){
    for(let qIndex=0; qIndex<=lastQuestion; qIndex++)
    {
        progress.innerHTML += "<div class='prog' id="+qIndex+"></div>";
    }
}


//counter render


function renderCounter(){
    if(count <= questionTime)
    {
        counter.innerHTML = count;
        timeGauge.style.width = count*gaugeUnit+"px";
        count++;
    }
    else{
        count=0;
        answerIsWrong();
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
        }
        else
    {
        //end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
    }

}

// check answer

function checkAnswer(answer)
{
    if(answer == questions[runningQuestion].correct)
    {
        //answer is correct
        score++;
        //change progress to green
        answerIsCorrect(); 
    }
    else{
        //answer is correct
        answerIsWrong();
        //change progress to green
    }
    count=0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }
    else
    {
        //end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender(){
    scoreDiv.style.display ="block";
    // display % results
    const scorepercent = Math.round(100*score/questions.length);

    //choosing img

    let img = (scorepercent >= 80)? "img/5.png" :
              (scorepercent >= 60)? "img/4.png" :
              (scorepercent >= 40)? "img/3.png" :
              (scorepercent >= 20)? "img/2.png" : "img/1.png";

    scoreDiv.innerHTML = "<img src="+img+">";
    scoreDiv.innerHTML += "<p>" +scorepercent+ "%</p>";
}