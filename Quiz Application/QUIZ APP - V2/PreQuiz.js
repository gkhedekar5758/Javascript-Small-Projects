const QUESTIONELEMENT= document.getElementById("numberOfQuestions");
const CATEGORYELEMENT=document.getElementById("category");
const DIFFICULTYELEMENT=document.getElementById("difficulty");
function startGame(){
    let number=QUESTIONELEMENT.value;
    let category=CATEGORYELEMENT.value;
    let difficult=DIFFICULTYELEMENT.value;

    //console.log(number +" "+category+" "+difficult)

    let urlForNextPage=`Quiz.html?amount=${encodeURIComponent(number)}&category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficult)}`;
    //let urlForNextPage=`Quiz.html`
    document.location.href=urlForNextPage;
}