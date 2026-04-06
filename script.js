let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes(){
localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote(){
let title = document.getElementById("title").value;
let note = document.getElementById("note").value;
let tag = document.getElementById("tag").value;

notes.push({
title,
note,
tag,
date: new Date().toLocaleString(),
pinned:false
});

saveNotes();
displayNotes();
}

function displayNotes(){
let container = document.getElementById("notes");
container.innerHTML="";

notes.forEach((n,i)=>{
container.innerHTML += `
<div class="note">
<h3>${n.title}</h3>
<p>${n.note}</p>
<div class="tag">${n.tag} | ${n.date}</div>

<button onclick="pin(${i})">📌</button>
<button onclick="edit(${i})">Edit</button>
<button onclick="del(${i})">Delete</button>
</div>
`;
});
}

function del(i){
notes.splice(i,1);
saveNotes();
displayNotes();
}

function edit(i){
let newText = prompt("Edit note", notes[i].note);
notes[i].note = newText;
saveNotes();
displayNotes();
}

function pin(i){
notes[i].pinned = !notes[i].pinned;
notes.sort((a,b)=> b.pinned - a.pinned);
saveNotes();
displayNotes();
}

document.getElementById("search").addEventListener("input", function(){
let search = this.value.toLowerCase();

let filtered = notes.filter(n =>
n.title.toLowerCase().includes(search) ||
n.note.toLowerCase().includes(search)
);

displayFiltered(filtered);
});

function displayFiltered(list){
let container = document.getElementById("notes");
container.innerHTML="";

list.forEach((n,i)=>{
container.innerHTML += `
<div class="note">
<h3>${n.title}</h3>
<p>${n.note}</p>
<div class="tag">${n.tag} | ${n.date}</div>
</div>
`;
});
}

displayNotes();
