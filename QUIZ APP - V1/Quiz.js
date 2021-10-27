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
const progressBarElement=document.querySelector(".progressBarFull");
const progressTextElement=document.querySelector(".progressText");
const scoreTextElement=document.querySelector(".scoreContent p");
const timerPara=document.querySelector(".timerRegion p");
const questionTimerPara=document.querySelector(".questionTimer p");

var  lastQuestionAnswered;
var score;
var timer=[0, 0, 0, 0];
var questionTimer=[0,0,0];
var timerIsRunning=false;
var intervalQuestion;
var intervalTimer;
var intervalSingleQuestion;
//when window loads initialize the game

lastQuestionAnswered=0;
score=0;
startGame();

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
    intervalTimer=setInterval(startTimer,10);
  }
  
  intervalSingleQuestion=setInterval(questionTimerFun,10);
}
function startTimer() {
  //console.log("starttimer"+ timer[3] +"  "+timer[0]);
  var currentTime= padLeadingZero(timer[0]) +":"+ padLeadingZero(timer[1]) +":"+ padLeadingZero(timer[2]) ;
  timerPara.innerText=" Timer : "+currentTime;
  timer[3]++;

  timer[0]=Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

}

 function questionTimerFun() {
  //question timer
  //console.log("starttimer"+ timer[1] +"  "+timer[0]+" "+timer[2]);
  var currentQuestionTime = padLeadingZero(questionTimer[0]) +":"+ padLeadingZero(questionTimer[1])
  questionTimerPara.innerText=" Question Timer : "+currentQuestionTime;
  questionTimer[2]++;
  questionTimer[0]=Math.floor((questionTimer[3]/100)/60);
  questionTimer[1] = Math.floor((questionTimer[3]/100) - (questionTimer[0] * 60));
}
function padLeadingZero(params) {
  if(+params<=9)
    return "0"+params;
  else
    return params;
}
//load  the next question
function LoadNextQuestion(){
  clearInterval(intervalQuestion);
  //lastQuestionAnswered++;
   progressBarElement.style.width=`${(lastQuestionAnswered/MAX_QUESTION)*100}%`;
   progressTextElement.innerText=` Question ${lastQuestionAnswered} of ${MAX_QUESTION}`;
  if(lastQuestionAnswered < MAX_QUESTION){
  
    questionElement.innerText=questionsArray[lastQuestionAnswered].question;
    option1Element.innerText=questionsArray[lastQuestionAnswered].choice1;
    option2Element.innerText=questionsArray[lastQuestionAnswered].choice2;
    option3Element.innerText=questionsArray[lastQuestionAnswered].choice3;
    option4Element.innerText=questionsArray[lastQuestionAnswered].choice4;
  }
   
}

//check the answer
function checkAnswer(event){
  
  let correctAnswer=questionsArray[lastQuestionAnswered].answer; //this is correct answer

  let userAns=this.id.substr(-1); //this answer user has given
  const d=event.target;

  if(+userAns === correctAnswer){
    d.setAttribute("style","color:white;");
    d.parentElement.setAttribute("style","background-color :green; color:white;");
    score+=SCORE_BONUS;
    scoreTextElement.innerText=` Score : ${score}`
  }
  else{
    d.setAttribute("style","color:white;");
    d.parentElement.setAttribute("style","background-color :red; ");
  }

  if(lastQuestionAnswered<MAX_QUESTION-1){
    intervalQuestion=   setInterval(function(){
      d.removeAttribute("style");
      d.parentElement.removeAttribute("style");
      LoadNextQuestion();
    },500);
  }
  if(lastQuestionAnswered==MAX_QUESTION-1){
    progressBarElement.style.width=`${(lastQuestionAnswered+1/MAX_QUESTION)*100}%`;
    progressTextElement.innerText=` Question ${lastQuestionAnswered+1} of ${MAX_QUESTION}`;
    clearInterval(intervalTimer);
  }
  lastQuestionAnswered++;
  
}


//************* event binding section *********************/
//bind the function to click event
option1Element.addEventListener("click",checkAnswer,false);
option2Element.addEventListener("click",checkAnswer,false);
option3Element.addEventListener("click",checkAnswer,false);
option4Element.addEventListener("click",checkAnswer,false);



  
  