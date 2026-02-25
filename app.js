const content = document.getElementById("content");
const title = document.getElementById("title");
const nav = document.querySelectorAll(".nav");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let notes = JSON.parse(localStorage.getItem("notes")) || [];

let pomodoroTime = 1500;
let pomodoroInterval;

loadPage("dashboard");

nav.forEach(item=>{
item.addEventListener("click",()=>{
document.querySelector(".active").classList.remove("active");
item.classList.add("active");
loadPage(item.dataset.page);
});
});

function loadPage(page){
title.innerText = page.charAt(0).toUpperCase()+page.slice(1);

if(page==="dashboard"){
content.innerHTML=`
<div class="card">
<h2>Welcome Back 🚀</h2>
<p>Total Tasks: ${tasks.length}</p>
<p>Completed: ${tasks.filter(t=>t.done).length}</p>
</div>
`;
}

if(page==="tasks"){
content.innerHTML=`
<div class="card">
<input id="taskInput" placeholder="Add task...">
<button onclick="addTask()">Add Task</button>
<div id="taskList"></div>
</div>
`;
renderTasks();
}

if(page==="pomodoro"){
content.innerHTML=`
<div class="card">
<h2>Pomodoro Timer</h2>
<h1 id="timer">25:00</h1>
<button onclick="startPomodoro()">Start</button>
<button onclick="resetPomodoro()">Reset</button>
</div>
`;
}

if(page==="cgpa"){
content.innerHTML=`
<div class="card">
<h2>CGPA Calculator</h2>
<input id="g1" placeholder="Subject 1 GPA">
<input id="g2" placeholder="Subject 2 GPA">
<input id="g3" placeholder="Subject 3 GPA">
<input id="g4" placeholder="Subject 4 GPA">
<button onclick="calcCGPA()">Calculate</button>
<h3 id="cgpaResult"></h3>
</div>
`;
}

if(page==="notes"){
content.innerHTML=`
<div class="card">
<textarea id="noteInput" placeholder="Write note..."></textarea>
<button onclick="addNote()">Save Note</button>
<div id="noteList"></div>
</div>
`;
renderNotes();
}

if(page==="progress"){
let completed = tasks.filter(t=>t.done).length;
let percent = tasks.length? (completed/tasks.length)*100 : 0;

content.innerHTML=`
<div class="card">
<h2>Progress</h2>
<div class="progress-bar">
<div class="progress-fill" style="width:${percent}%"></div>
</div>
<p>${percent.toFixed(0)}% Completed</p>
</div>
`;
}

if(page==="settings"){
content.innerHTML=`
<div class="card">
<button onclick="localStorage.clear();location.reload();">Clear Data</button>
</div>
`;
}
}

/* Tasks */
function addTask(){
let input=document.getElementById("taskInput");
if(input.value==="") return;
tasks.push({text:input.value,done:false});
localStorage.setItem("tasks",JSON.stringify(tasks));
input.value="";
renderTasks();
}

function renderTasks(){
let list=document.getElementById("taskList");
if(!list) return;
list.innerHTML="";
tasks.forEach((task,index)=>{
list.innerHTML+=`
<div class="task">
<span onclick="toggleTask(${index})" style="cursor:pointer">
${task.done?"✅":"⬜"} ${task.text}
</span>
<button onclick="deleteTask(${index})">❌</button>
</div>
`;
});
}

function toggleTask(index){
tasks[index].done=!tasks[index].done;
localStorage.setItem("tasks",JSON.stringify(tasks));
renderTasks();
}

function deleteTask(index){
tasks.splice(index,1);
localStorage.setItem("tasks",JSON.stringify(tasks));
renderTasks();
}

/* Notes */
function addNote(){
let input=document.getElementById("noteInput");
if(input.value==="") return;
notes.push(input.value);
localStorage.setItem("notes",JSON.stringify(notes));
input.value="";
renderNotes();
}

function renderNotes(){
let list=document.getElementById("noteList");
if(!list) return;
list.innerHTML="";
notes.forEach(note=>{
list.innerHTML+=`<div class="card">${note}</div>`;
});
}

/* Pomodoro */
function startPomodoro(){
pomodoroInterval=setInterval(()=>{
if(pomodoroTime<=0){clearInterval(pomodoroInterval);return;}
pomodoroTime--;
let min=Math.floor(pomodoroTime/60);
let sec=pomodoroTime%60;
document.getElementById("timer").innerText=`${min}:${sec<10?"0":""}${sec}`;
},1000);
}

function resetPomodoro(){
clearInterval(pomodoroInterval);
pomodoroTime=1500;
document.getElementById("timer").innerText="25:00";
}

/* CGPA */
function calcCGPA(){
let g1=parseFloat(document.getElementById("g1").value)||0;
let g2=parseFloat(document.getElementById("g2").value)||0;
let g3=parseFloat(document.getElementById("g3").value)||0;
let g4=parseFloat(document.getElementById("g4").value)||0;
let avg=((g1+g2+g3+g4)/4).toFixed(2);
document.getElementById("cgpaResult").innerText="Your CGPA: "+avg;
}

/* Dark Mode */
document.getElementById("darkToggle").onclick=()=>{
document.body.classList.toggle("dark");
};
