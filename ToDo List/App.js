import Category from './Category.js';
import Task from './Task.js';
import { displayCategory, displayTask } from './View.js';
import { addCategoryToStorage, loadCategories, addTaskToLocalStorage, loadTasks, deleteTaskFromLocalStorage } from './localStorage.js';

//Category list
let categoryList = [];
let selectedCategory = null;

//Load categories from localStorage on page load function
const loadCategoriesFunction = () => {
    categoryList = loadCategories();
    categoryList.forEach(category => {
        const newCategory = new Category(category.name);
        categoryList.push(newCategory);
        displayCategory(newCategory);
    });
const half = Math.ceil(categoryList.length / 2);
categoryList.splice(0, half);
console.log(categoryList);
};

loadCategoriesFunction();

//load tasks for each category
const loadTasksForCategories = () => {
    categoryList.forEach(category => {
        const tasks = loadTasks(category.name);
        tasks.forEach(taskData => {
            const task = new Task(taskData.name, taskData.description, taskData.dueDate, taskData.priority, taskData.category, taskData.id);
            category.addTask(task);
            displayTask(task);
        });
    });
}

loadTasksForCategories();

//Add Task Dialog
const dialog = document.getElementById("addTaskDialog");
const addTaskButton = document.getElementById("addTaskBtn");
addTaskButton.addEventListener("click", () => {
  dialog.showModal();
});

const submitTaskButton = document.getElementById("submitTaskBtn");
const closeDialogButton = document.getElementById("closeAddTaskDisplay");
const formTask = document.getElementById("addTask-form");
closeDialogButton.addEventListener("click", () => {
    formTask.reset();
    dialog.close();
});

submitTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const dueDate = document.getElementById("taskDateDue").value;
    const priority = document.getElementById("taskPriority").value;
    const categoryName = document.getElementById("taskCategory").value;
    const newTask = new Task(name, description, dueDate, priority, categoryName);
    const category = categoryList.find(cat => cat.name === categoryName);
    if (category) {
        category.addTask(newTask);
        addTaskToLocalStorage(newTask);
        if(!selectedCategory || selectedCategory === categoryName) {
            displayTask(newTask);            
        }
    }
    dialog.close();
    formTask.reset();
    console.log(categoryList);
});

//Add Category Dialog
const categoryDialog = document.getElementById("addCategoryDialog");
const addCategoryButton = document.getElementById("addCategoryBtn");
addCategoryButton.addEventListener("click", () => {
    categoryDialog.showModal();
});


const submitCategoryButton = document.getElementById("submitCategoryBtn");
const closeCategoryDialogButton = document.getElementById("closeAddCategoryDisplay");

closeCategoryDialogButton.addEventListener("click", () => {
    formTask.reset();
    categoryDialog.close();
});

submitCategoryButton.addEventListener("click", (e) => {
    const categoryName = document.getElementById("categoryName").value;
    if (categoryName) {
        const newCategory = new Category(categoryName);
        categoryList.push(newCategory);
        addCategoryToStorage(newCategory);
        categoryDialog.close();
        formTask.reset();
        displayCategory(newCategory);
    }
    console.log(categoryList);
});

// Clear tasks for testing purposes
//delete task functionality
const taskListElement = document.getElementById("taskList");

taskListElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-task-btn")) {
        const taskItem = e.target.closest(".task-item");
        if (taskItem) {
            const taskId = taskItem.getAttribute("data-task-id");
            const categoryName = taskItem.getAttribute("data-category-name");
            taskItem.remove();
            
            const category = categoryList.find(cat => cat.name === categoryName);
            if (category) {
                console.log(`Deleting task with ID: ${taskId} from category: ${categoryName}`);
                deleteTaskFromLocalStorage(taskId);
                console.log(`Task with ID ${taskId} ${typeof taskId} deleted from category ${categoryName}  and ${taskItem.getAttribute("data-task-id")} ${typeof taskItem.getAttribute("data-task-id")} ` );
                category.tasks = category.tasks.filter(task => task.id != taskId);
                              
            }

            console.log(categoryList);
        }
    }
});

// Load tasks for each category
const categoryButtonsDiv = document.getElementById("categories");

categoryButtonsDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("category-button")) {
        const categoryName = e.target.getAttribute("data-category-name");
        selectedCategory = categoryName;
        console.log(`Loading tasks for category: ${categoryName}`);
        const category = categoryList.find(cat => cat.name === categoryName);
        if (category) {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = ""; // Clear existing tasks
            category.getTasks().forEach(task => {
                displayTask(task);
            });
        }
    }
});
