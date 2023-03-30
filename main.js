let input = document.querySelector("input[type = 'text']");
let btn = document.querySelector("#btn");
let tasksDiv = document.querySelector(".tasks");
let children ;
let mood = "add";
let xVar;

let tasksContainer = JSON.parse(localStorage.getItem("tasks")) || [];

btn.addEventListener("click", () => {
  if (input.value !== "") {
    addTasks();
    showInPage();
  }else{
    alert(" Field can not be empty")
    input.focus()
  }
  input.value = "";
});



// add or update tasks in array & set this array in localStorage
function addTasks() {
  if (mood == "add") {
    tasksContainer.push(input.value);
  } else {
    tasksContainer[xVar] = input.value;
    mood = "add";
    btn.textContent = "Add";
  }
  localStorage.setItem("tasks", JSON.stringify(tasksContainer));
}
//show stored data in the page
function showInPage() {
  tasksDiv.innerHTML = "";
  tasksContainer.forEach((item, index) => {
    tasksDiv.innerHTML += `
       <div>
      <p onclick = "mark(this)" >${item}</p>
      <div class="icons">
          <i class="fa-sharp fa-solid fa-pencil" onclick = "editData(${index},this)">   </i>
          <i class="fa-regular fa-trash-can"     onclick = "deleteItem(${index})"> </i>
      </div>
  </div> 
      `;
      
  });
  tasksContainer.length > 1
    ? (document.querySelector("#delete-all").innerHTML = `
  <button onclick = "deleteAll()"> Delete All Your <span> ${tasksContainer.length} </span> Tasks</button>
  `)
    : (document.querySelector("#delete-all").innerHTML = "");
    
    getStorValues()

}
showInPage();

//mark the finished tasks


function mark(p) {
  p.classList.toggle("marked")

  let theme = []
if(children.length !== 0){
  for (const item of children) {
    
    item.firstElementChild.classList.contains("marked") ? theme.push ("completed") : theme.push("not-completed") 
  }
}

localStorage.setItem("taskCompletion",JSON.stringify(theme))
}

    //get marked task from local storage
function getStorValues(){
  children = tasksDiv.children
  let getTheme = JSON.parse(localStorage.getItem("taskCompletion"))
  if(getTheme !== null){
    for(let i = 0 ; i < getTheme.length ; i++){
      getTheme[i] == "completed" ? 
       children[i].firstElementChild.classList.add("marked")
      :children[i].firstElementChild.classList.remove("marked")
      }
  
  }
   

}

// delete item from the array & update localStorage
function deleteItem(index) {
  tasksContainer.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksContainer));
  showInPage();
}

//delete all item from the array & update localStorage
function deleteAll() {
  tasksContainer.splice(0);
  localStorage.removeItem("tasks");
  localStorage.removeItem("taskCompletion")
  showInPage();
}

// edit data
function editData(index, i) {
  input.value = tasksContainer[index];
  i.style.display = "none";
  input.focus();
  xVar = index;
  mood = "save Change";
  btn.textContent = "save Change";
}
