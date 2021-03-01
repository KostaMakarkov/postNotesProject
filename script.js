

class Note{
    constructor(id, noteContent, noteDate, noteTime){
        this.id = id;
        this.noteContent = noteContent;
        this.noteDate = noteDate;
        this.noteTime = noteTime;
    }
}

let notes = loadFromStorage(`notes`) ? loadFromStorage(`notes`) : [];
let idNum = loadFromStorage(`noteID`) ? loadFromStorage(`noteID`) : [0];

const createNote = (content, date, time) => {
    idNum++;
    const note = new Note(idNum, content, date, time)
    notes.push(note);
    buildHtml(note);
    saveInStorage(note)
}

    const buildHtml = (note) => {
    const divBody = document.createElement(`div`);
    divBody.className = `divBodyStyle`;
    const pContent = document.createElement(`p`);
    pContent.textContent = note.noteContent;
    pContent.className = `contentStyle`;
    const spanDate = document.createElement(`span`);
    spanDate.textContent = note.noteDate;
    const spanTime = document.createElement(`span`);
    spanTime.textContent = note.noteTime;
    const deleteIcon = document.createElement(`span`);
    deleteIcon.textContent = `X`;
    deleteIcon.addEventListener(`click`, () => deleteNote(note.id))
    deleteIcon.classList = `deleteIcon`;

    divBody.appendChild(deleteIcon);    
    divBody.appendChild(pContent);
    divBody.appendChild(spanDate);
    divBody.appendChild(spanTime);
    

    
    document.getElementById(`notesBoard`).appendChild(divBody);

}
 
const saveInStorage =  () => {
    localStorage.setItem(`noteID`, idNum);
    localStorage.setItem(`notes`, JSON.stringify(notes)) ;
};

function loadFromStorage(data){
    return JSON.parse(localStorage.getItem(data)) 
}; 

const deleteNote = (noteId) => {
    notes = notes.filter(ele => ele.id != noteId);
    document.getElementById(`notesBoard`).innerHTML = ``;
    notes.forEach(buildHtml);
    saveInStorage();
}

window.onload = () => {notes.forEach(buildHtml)};



