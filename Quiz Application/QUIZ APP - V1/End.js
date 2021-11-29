const MAX_SCORE = JSON.parse(window.localStorage.getItem('score')) || [];
const CURRENT_MAX_SCORE= +window.localStorage.getItem('currentScore');
const Timing= window.localStorage.getItem('timing');
const CURRENT_Timing= window.localStorage.getItem('currentTiming');

const ScoreElement=document.querySelector("#score");
const TimingElement=document.querySelector("#timing");
const UserScoreElement=document.querySelector("#UserScore");
const UserTimingElement=document.querySelector("#UserTiming");
const UserHighScoreAreaElement=document.querySelector(".UserHighScoreArea");
const UserNameElement=document.querySelector("#uname");
const UserNameHighScoreElement=document.querySelector("#user");
const BtnSaveElement=document.querySelector("#btnSave");


var s= isNaN(MAX_SCORE.score) ? 0 : +MAX_SCORE.score;
var t=MAX_SCORE.timing=== undefined ? '00:00:00' : MAX_SCORE.timing;

ScoreElement.innerText="Score : " +s; 
TimingElement.innerText="Timing : " + t;
UserNameHighScoreElement.innerText= MAX_SCORE.userName === undefined ? "UserName : "+ " ": "UserName : " +MAX_SCORE.userName;
UserScoreElement.innerText="Score : " + CURRENT_MAX_SCORE;
var tu= CURRENT_Timing===null ?0: CURRENT_Timing;
UserTimingElement.innerText="Timing : " + tu;

let showAreaDoStuff= () =>{
    UserHighScoreAreaElement.setAttribute('style','display:block');
    
}
//now we should replace the score if the user has scored high score than last high score
let checkHighScore = () => {
    if(CURRENT_MAX_SCORE > s ){
        showAreaDoStuff();
        
    }
    else if(CURRENT_MAX_SCORE === s && TimingFunc(CURRENT_Timing) < TimingFunc(t)){
        showAreaDoStuff();
    }
};

let TimingFunc = (param) => {
    var hour=param.substr(0,2);
    var min=param.substr(3,2);
    var sec=param.substr(6,2);
    var date=new Date('2012','04','12',hour,min,sec);
    //console.log(date.getTime());
    return date.getTime();
}

let btnSaveEventListener = () =>{
    let scoreObj={
        userName:UserNameElement.value,
        score:CURRENT_MAX_SCORE,
        timing:CURRENT_Timing

    }
    //MAX_SCORE.userName=userName,MAX_SCORE.timing=timing,MAX_SCORE.score=score;
    window.localStorage.setItem('score',JSON.stringify(scoreObj));
}
checkHighScore();
BtnSaveElement.addEventListener('click',btnSaveEventListener,false);


