const addtaskcontainer = document.getElementById("add-task-container");
const addTask = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
const inputTask = document.getElementById("input-task");
const remainingItems = document.getElementsByClassName("remaining")[0];
const lightmode = document.getElementsByClassName("lightmode")[0];

////////////////////////////////////////////////MAKE TASKS DRAGGABLE////////////////////////////////////////////////
let draggedTask = null;

// Function called when drag starts
function dragStart(event) {
  draggedTask = event.target;
  event.dataTransfer.setData("text/plain", event.target.innerHTML);
}

// Function called when drag over
function dragOver(event) {
  event.preventDefault();
}

// Function called when drop happens
function drop(event) {
  event.preventDefault();
  if (draggedTask) {
    const dropTarget = event.target;
    const taskContainer = document.getElementById("task-container");
    const tasks = Array.from(taskContainer.getElementsByClassName("task"));
    const dropIndex = tasks.indexOf(dropTarget);

    // Reorder the tasks
    if (dropIndex == tasks.length - 1) {
      taskContainer.removeChild(draggedTask);
      taskContainer.appendChild(draggedTask);
    } else if (dropIndex !== -1) {
      taskContainer.removeChild(draggedTask);
      taskContainer.insertBefore(draggedTask, tasks[dropIndex]);
    }

    draggedTask = null;
  }
}

taskContainer.addEventListener("dragover", dragOver);
taskContainer.addEventListener("drop", drop);

// -------------container dark/light mode ------------------------

let darklightcontainer=true;
lightmode.addEventListener("click", function () {
  if (darklightcontainer === true) {
    darklightcontainer = false;
  } else {
    darklightcontainer = true;
  }
  toggleDarkLightMode(); 
});

function toggleDarkLightMode() {
  let taskElemArray = document.querySelectorAll(".task");

  taskElemArray.forEach(function(taskElement) {
    if (darklightcontainer) {
          if(taskElement.classList.contains('light')){
            taskElement.classList.remove("light");
          }
          taskElement.classList.add("dark");
          darklightcontainer=true;
    
    } else {

      if(taskElement.classList.contains('dark')){
        taskElement.classList.remove("dark");
      }
      taskElement.classList.add("light");
      darklightcontainer=false;
    }
  });
}

toggleDarkLightMode();


// to track number of todo/ item info
let iteminfo = document.createElement("div");
iteminfo.classList.add("iteminfo");
let itemno = document.createElement("p");
iteminfo.appendChild(itemno);
let count = 0;


// all button
let all = document.createElement("button");
all.innerHTML = "All";
all.classList.add("itembtns");
iteminfo.appendChild(all);

// active button
let activebtn = document.createElement("button");
activebtn.innerHTML = "Active";
activebtn.classList.add("itembtns");
iteminfo.appendChild(activebtn);

// completed button
let completed = document.createElement("button");
completed.innerHTML = "Completed";
completed.classList.add("itembtns");
completed.classList.add("completed");
iteminfo.appendChild(completed);

// clear completed button
let clearcmp = document.createElement("button");
clearcmp.innerHTML = "Clear Completed";
clearcmp.classList.add("itembtns");
iteminfo.appendChild(clearcmp);


// when new todo is added

addTask.addEventListener("click", function () {
  let task = document.createElement("div");
  task.classList.add("task");
  if(darklightcontainer===true){
    task.classList.add('dark');
  }
  else{
    task.classList.add('light')
  }
  task.draggable = true;
  task.addEventListener("dragstart", dragStart);

  //check button
  let checkButton = document.createElement("button");
  checkButton.innerHTML =
    '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
  checkButton.classList.add("deleteTask");
  task.appendChild(checkButton);

  let li = document.createElement("li");
  li.innerText = `${inputTask.value}`;
  li.classList.add("draggables");
  li.setAttribute("draggable", "true");
  task.appendChild(li);

  if (inputTask.value === "") {
    alert("Please Enter a Task");
  } else {
    iteminfo.classList.add("iteminfo");
    count++;
    itemno.innerText = `${count} item left`;
    taskContainer.appendChild(task);
    remainingItems.appendChild(iteminfo);
  }

  inputTask.value = "";

  // when checked
  let checked = false;
  function toggle() {
    checked = !checked; 
  }

  function ischecked() {
    if (checkButton.parentElement.classList.contains("checked")) {
      checkButton.parentElement.classList.remove("checked");
    } else {
      checkButton.parentElement.classList.add("checked");
    }
  }

  checkButton.addEventListener("click", function () {
    ischecked();
    toggle();
    if (checked == true) {
      count--;
    } else {
      count++;
    }
    itemno.innerText = `${count} item left`;
  });

  //Active button function

  activebtn.addEventListener("click", function () {
    let taskElementsArray = document.getElementsByClassName("task");
    Array.prototype.forEach.call(taskElementsArray, function (element) {
      if (element.classList.contains("checked")) {
        element.classList.add("hide");
      } else {
        element.classList.remove("hide");
      }
    });
  });

  // deleting all checked todos
  clearcmp.addEventListener("click", function () {
    let taskElementsArray = document.getElementsByClassName("task");
    // each task with line-through text decoration gets removed
    Array.prototype.forEach.call(taskElementsArray, function (element) {
      if (element.classList.contains("checked")) {
        element.remove();
      }
    });
  });

  // showing completed task
  completed.addEventListener("click", function () {
    let taskElementsArray = document.getElementsByClassName("task");
    Array.prototype.forEach.call(taskElementsArray, function (element) {
      if (!element.classList.contains("checked")) {
        element.classList.add("hide");
      }
    });
  });

  // showing ALL task
  all.addEventListener("click", function () {
    let taskElementsArray = document.getElementsByClassName("task");
    Array.prototype.forEach.call(taskElementsArray, function (element) {
      if (element.classList.contains("hide")) {
        element.classList.remove("hide");
      }
    });
  });
});

// light mode
let islightmode = false;
lightmode.addEventListener("click", function () {
  if (!islightmode) {
    
    document.body.style.backgroundImage =
      "url('https://wallpaperaccess.com/full/168823.jpg'), url('white2.jpg')";
      document.body.style.backgroundColor="white";
    
    islightmode = true;
    addtaskcontainer.style.backgroundColor = "white";
    inputTask.style.backgroundColor = "white";
    inputTask.style.color = "black";    
  } 
  else {
    document.body.style.backgroundImage =
      "url('https://wallpaperaccess.com/full/168823.jpg'), url('black.jpg')";
      document.body.style.backgroundColor="black";

    islightmode = false;
    addtaskcontainer.style.backgroundColor = "rgb(37, 35, 35)";
    inputTask.style.backgroundColor = "rgb(37, 35, 35)";
    inputTask.style.color = "white";
  }
});
















  
    
