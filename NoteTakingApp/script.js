// console.log("Script attached")
//Learning and implementing Javascript concept
// this small project is taken as a home work from codewithharrychannel
// https://www.youtube.com/watch?v=kwgNsNhYcHo&list=PLu0W_9lII9ajyk081To1Cbt2eI5913SsL&index=22&ab_channel=CodeWithHarry
let totalNotes = 0;
localStorage.setItem("TotalNote", totalNotes);
totalNotes = localStorage.getItem("TotalNote");
const BTN_ADD_NOTE = document.getElementById("btnAddNote");
const CONTAINER_DIV = document.getElementsByClassName("container");
const SEARCH_TEXTBOX = document.getElementById("searchText");

//on button add add the note to the list
BTN_ADD_NOTE.addEventListener("click", () => {
    //if the notes are more than 3 then create a new row
    if (totalNotes % 3 == 0) {
        //create row
        let rowDiv = document.createElement("div");
        rowDiv.className = "row";
        //create col
        let colDiv = document.createElement("div");
        colDiv.className = "col";
        //append as child this new content to col
        colDiv.appendChild(createContentNode());
        rowDiv.appendChild(colDiv)

        CONTAINER_DIV[0].appendChild(rowDiv);
        //update the storage
        totalNotes++;
        localStorage.setItem("TotalNote", totalNotes);
    } else {
        //create col
        let colDiv = document.createElement("div");
        colDiv.className = "col";
        //append as child this new content to col
        colDiv.appendChild(createContentNode());
        let rowCol = document.getElementsByClassName("row");

        rowCol[rowCol.length - 1].appendChild(colDiv);
        totalNotes++;
        localStorage.setItem("TotalNote", totalNotes);
    }

    document.getElementById("floatingTextarea").value="";
});

//create the contenet node to be appended
let createContentNode = () => {
    let divNewCard = document.createElement("div");
    divNewCard.classList.add("card");
    divNewCard.classList.add("mt-3")
    let divCardBody = document.createElement("div");
    divCardBody.className = "card-body"
    let pCardText = document.createElement("p");
    pCardText.className = "card-text";
    pCardText.appendChild(document.createTextNode(document.getElementById("floatingTextarea").value));
    let button = document.createElement("button");
    button.setAttribute("id", totalNotes);
    button.setAttribute("onclick", "deleteNote(this.id)");
    button.innerHTML = "Delete Note";
    button.className = "btn btn-danger";

    divCardBody.appendChild(pCardText);
    divCardBody.appendChild(button);
    divNewCard.appendChild(divCardBody);

    return divNewCard;
};

//when user search,filter the notes
SEARCH_TEXTBOX.addEventListener("keyup", (eventTarget) => {

    Array.from(document.getElementsByClassName("card-text")).forEach(x => x.parentElement.parentElement.removeAttribute("hidden"));
    let newNodes = Array.from(document.getElementsByClassName("card-text")).filter(x => !x.innerText.includes(eventTarget.target.value));
    newNodes.forEach(x => x.parentElement.parentElement.setAttribute("hidden", "true"))
});

//deleting the notes
let deleteNote = (index) => {
    let button = document.getElementById(index);
    console.log(button.parentElement.parentElement);

    let removeElement = button.parentElement.parentElement.parentElement;
    let parent = removeElement.parentElement.removeChild(removeElement);
    totalNotes--;
    localStorage.setItem("TotalNote", totalNotes);
};