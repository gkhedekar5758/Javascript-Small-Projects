let questionsArray=[
    {
      "question": "Inside which HTML element do we put the JavaScript??",
      "choice1": "<script>",
      "choice2": "<javascript>",
      "choice3": "<js>",
      "choice4": "<scripting>",
      "answer": 1
    },
    {
      "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
      "choice1": "<script href='xxx.js'>",
      "choice2": "<script name='xxx.js'>",
      "choice3": "<script src='xxx.js'>",
      "choice4": "<script file='xxx.js'>",
      "answer": 3
    },
    {
      "question": " How do you write 'Hello World' in an alert box?",
      "choice1": "msgBox('Hello World');",
      "choice2": "alertBox('Hello World');",
      "choice3": "msg('Hello World');",
      "choice4": "alert('Hello World');",
      "answer": 4
    },
    {
      
      "question": "What does GHz stand for?",
      "answer": 4,
      "choice4":"Gigahertz",
        "choice1":"Gigahotz",
        "choice2":"Gigahetz",
        "choice3":"Gigahatz"
    },
    {
      "question": "What amount of bits commonly equals one byte?",
      "answer": 3,
      "choice4":"64",
        "choice1":"1",
        "choice2":"2",
        "choice3":"8"
    },
    {
      "question": "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
      "answer": 4,
      "choice4":"Final",
        "choice1":"Static",
        "choice2":"Private",
        "choice3":"Public"

    }
  ];

  
// how many question are there in the game
const MAX_QUESTION=questionsArray.length;
const SCORE_BONUS=10;
const questionElement=document.querySelector(".question p");
const option1Element=document.querySelector("#opt1");
const option2Element=document.querySelector("#opt2");
const option3Element=document.querySelector("#opt3");
const option4Element=document.querySelector("#opt4");
const NextButtonElement=document.querySelector("#nextQuestion");
const lockAnswerButtonElement=document.querySelector("#lockAnswer");
const radioButtonElements=document.querySelectorAll("input[name='option']");
const progressBarElement=document.querySelector(".progressBar");
const progressTextElement=document.querySelector(".progressText");
const scoreTextElement=document.querySelector(".scoreText");
const timerSpan=document.querySelector(".masterTimer span");

var  lastQuestionAnswered;
var score;
var timer=[0, 0, 0, 0];
var timerIsRunning=false;
var interval;
//when window loads initialize the game
window.onload=function(){
  lastQuestionAnswered=0;
  score=0;
  startGame()
}
//start the game
function startGame(){
  progressBarElement.style.width=`${(lastQuestionAnswered/MAX_QUESTION)*100}%`;
  progressTextElement.innerText=` Question ${lastQuestionAnswered} of ${MAX_QUESTION}`;
  
  questionElement.innerText=questionsArray[lastQuestionAnswered].question;
  option1Element.innerText=questionsArray[lastQuestionAnswered].choice1;
  option2Element.innerText=questionsArray[lastQuestionAnswered].choice2;
  option3Element.innerText=questionsArray[lastQuestionAnswered].choice3;
  option4Element.innerText=questionsArray[lastQuestionAnswered].choice4;

  if(!timerIsRunning){
    timerIsRunning=true;
    interval=setInterval(startTimer,10);
  }
  //startTimer();
}
function startTimer() {
  //console.log("starttimer"+ timer[3] +"  "+timer[0]);
  var currentTime= padLeadingZero(timer[0]) +":"+ padLeadingZero(timer[1]) +":"+ padLeadingZero(timer[2]) ;
  timerSpan.innerText=currentTime;
  timer[3]++;

  timer[0]=Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}
function padLeadingZero(params) {
  if(+params<=9)
    return "0"+params;
  else
    return params;
}
//load  the next question
function LoadNextQuestion(){
  lastQuestionAnswered++;
  progressBarElement.style.width=`${(lastQuestionAnswered/MAX_QUESTION)*100}%`;
  progressTextElement.innerText=` Question ${lastQuestionAnswered} of ${MAX_QUESTION}`;
  if(lastQuestionAnswered < MAX_QUESTION){
    for(const value of radioButtonElements){
      value.parentElement.removeAttribute("style");
      value.parentElement.removeAttribute("disabled");
    }
    lockAnswerButtonElement.removeAttribute("disabled");
    questionElement.innerText=questionsArray[lastQuestionAnswered].question;
    option1Element.innerText=questionsArray[lastQuestionAnswered].choice1;
    option2Element.innerText=questionsArray[lastQuestionAnswered].choice2;
    option3Element.innerText=questionsArray[lastQuestionAnswered].choice3;
    option4Element.innerText=questionsArray[lastQuestionAnswered].choice4;
  }
  else{
    NextButtonElement.setAttribute("disabled","true");
    clearInterval(interval);
  }   
}

//check the answer
function checkAnswer(){
  let correctAnswer=questionsArray[lastQuestionAnswered].answer; //this is correct answer

  for(const value of radioButtonElements){
    if(value.checked===true){
      //
      if(value.id==correctAnswer){
        value.parentElement.setAttribute("style", "background-color: Green;");
        score+=SCORE_BONUS;
        scoreTextElement.innerText=`Score : ${score}`
      }
      else{
        value.parentElement.setAttribute("style", "background-color: Red;");
      }
    }
    
  }
  lockAnswerButtonElement.setAttribute("disabled","true");
}


//************* event binding section */
//bind the function to click event
NextButtonElement.addEventListener("click",LoadNextQuestion,false);
lockAnswerButtonElement.addEventListener("click",checkAnswer,false);


  
  