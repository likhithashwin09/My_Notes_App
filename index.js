let notesTitle = document.getElementById("notes-title")
let notesdesc = document.getElementById("notes-desc")
let notesAddBtn = document.getElementById("notes-add-btn")
let notesseccontainer = document.getElementById("notes-container");


let notes=[]
let parseddata = JSON.parse(localStorage.getItem("notes"));
if (parseddata?.length>0){
    notes=[...parseddata];
    gennote();
}
else{
    notes=[]
}

function del(notes1){
    notes=notes.filter(Ele=>Ele.id!=notes1.id)
    localStorage.setItem('notes',JSON.stringify(notes))
    gennote()

}

function gennote() {
    notesseccontainer.innerHTML = ""
    notes.forEach(notes1 => {
        let notesContainer = document.createElement("div");
        notesContainer.classList.add("notes-section")
        let title1 = document.createElement('p');
        title1.classList.add("title");
        let desc1 = document.createElement('p');
        desc1.classList.add("desc");
        let btn=document.createElement('Button')
        btn.classList.add('del');
        title1.innerHTML = notes1.title;
        desc1.innerHTML = notes1.desc;
        btn.innerHTML="delete";
        notesContainer.appendChild(title1);
        notesContainer.appendChild(desc1);
        notesContainer.appendChild(btn);
        notesseccontainer.appendChild(notesContainer);
        btn.addEventListener("click",()=>{
            del(notes1);
        })
    })
}


notesAddBtn.addEventListener("click", () => {
    let title = notesTitle.value.trim();
    let desc = notesdesc.value.trim();
    if (!title || !desc) return;
    else {
        let noteObj = {id:Date.now(), title, desc };
        notes = [...notes, noteObj]
        let onj = JSON.stringify(notes)
        localStorage.setItem('notes', onj)
        gennote();
        notesTitle.value = ''
        notesdesc.value = ''
    }
})



