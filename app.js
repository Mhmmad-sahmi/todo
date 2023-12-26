// task list

let inputValue = document.querySelector(".input");
let addBtn = document.querySelector(".Button");
let mainCont = document.querySelector(".appendix");
let delBtn = document.querySelector(".task-del-btn")

// array to contain all the tasks
let taskArr = [];
let deletedTasks = [];

//check if there is data already stored in the local storage
if(window.localStorage.getItem("tasks Arr")){
    // convert the retrived string to arr
    taskArr = window.localStorage.getItem("tasks Arr").split(",")
    // take arr elements and append their value to a new task
    taskArr.forEach((e)=>{
        creatElement(e)
    })
}

// Events
// Btn event Add
addBtn.addEventListener('click',()=>creatElement(inputValue.value));
addBtn.addEventListener('click',()=>taskArr = taskCollector());
addBtn.addEventListener('click',()=>localSave(taskArr));

// delet btn event
// event listner fo the whole dome
document.addEventListener("click",function(e){
    // if clicked element class name to dlet class name function works
    if(e.target.className === "task-del-btn"){
        // remove div
        e.target.parentElement.remove()
        //push hte text content of deleted to compare with the item arry 
        deletedTasks.push(e.target.previousSibling.innerHTML)
        // update the tasks if to delet the removed task
        taskArr = taskArr.filter((e)=>{return !deletedTasks.includes(e) })
        // update local storage with the new array
        window.localStorage.setItem("tasks Arr",taskArr) 
    }
})
// functions
// creat and add element to min div
function creatElement(elementValue){
    // IF INPUT FEILD IS EMPTY NO TASK ADDED
    if(elementValue !== ""){
        // div el
        let task = document.createElement("div");
        task.classList.add("task");
        // p el
        let taskCont = document.createElement("p");
        taskCont.classList.add("class-cont");
        taskCont.innerText = elementValue;
        // btn el
        let taskBtn = document.createElement("button");
        taskBtn.classList.add("task-del-btn");
        taskBtn.innerText=`Delet`;
        // append to task div
        task.appendChild(taskCont);
        task.appendChild(taskBtn);
        // append task div to main div
        mainCont.appendChild(task);
        // RESET INPUT VALUE
        inputValue.value = "";
        inputValue.focus()
    }else{
        inputValue.focus()
        return 0;
    }
}
// conver all the tasks value in an arr
function taskCollector(){
    let tasks = document.querySelectorAll('.task');
    let arr = [];
    tasks.forEach((e)=>{
       arr.push(e.firstChild.innerText);
    });
    return arr;
}
// save arr in the local storage 
function localSave(arrToSave){
    window.localStorage.setItem("tasks Arr",arrToSave);  
}
