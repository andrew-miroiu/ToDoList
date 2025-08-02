function displayCategory(category){
    const showCategories = document.getElementById("categories");
    const button = document.createElement("button");
    button.setAttribute("data-category-name", category.name);
    button.textContent = category.name;
    button.classList.add("category-button");
    showCategories.appendChild(button);
}

function displayTask(task) {
    const taskList = document.getElementById("taskList");
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.setAttribute("data-task-id", task.id); 
    taskItem.setAttribute("data-category-name", task.category); 

    taskItem.innerHTML = `
        <h3>${task.getName()}</h3>
        <p class="description">${task.getDescription()}</p>
        <p>Due: ${task.getDueDate()}</p>
        <p>Priority: ${task.getPriority()}</p>
        <p>Category: ${task.category}</p>
        <button class="delete-task-btn">Delete</button>
    `;
    taskList.appendChild(taskItem);
}
    
function loadCategoryTasks(){
    
}


export { displayCategory , displayTask };