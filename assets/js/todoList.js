//Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    //DOM load event 
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add Task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear all tasks
    clearBtn.addEventListener('click', clearAllTasks)
    //Filter tasks
    filter.addEventListener('keyup', filterTasks);
}
//get tasks from ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task) => {
    //Create li element 
    const li = document.createElement('li');
    li.className = 'collection-item';

    //Create test node and append to the li 
    li.appendChild(document.createTextNode(task));
    //Create new link element 
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
    })
}
//Add Task
function addTask(e){

    console.log(taskInput.value);
    if(taskInput.value === ''){
        alert('add a task');
    }

    //Create li element 
    const li = document.createElement('li');
    li.className = 'collection-item';

    //Create test node and append to the li 
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element 
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    //Store in local storage 
    storeTaskInLocalStorage(taskInput.value);
    //clear input 
    taskInput.value = '';
    e.preventDefault();
}

//Remove task function
function removeTask(e){
    console.log(e.target);
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure?")){
        e.target.parentElement.parentElement.remove();

        //remove from ls
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Clear all tasks
function clearAllTasks(e){
    // taskList.innerHTML = '';

    //faster

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

//Clear all local storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//Filter the tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }
    });
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(item){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
        if(task === item.textContent){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}