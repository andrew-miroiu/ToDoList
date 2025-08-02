function addCategoryToStorage(category) {
    const categories = getCategoriesFromStorage();
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
}

function getCategoriesFromStorage() {
    const categories = localStorage.getItem('categories');
    return categories ? JSON.parse(categories) : [];
}

function loadCategories() {
    const categories = getCategoriesFromStorage();
    return categories;
}

function addTaskToLocalStorage(task) {
    const tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks(categoryName) {
    const tasks = getTasksFromStorage();
    return tasks.filter(task => task.category === categoryName);
}

function deleteTaskFromLocalStorage(taskId) {
    const tasks = getTasksFromStorage();
    console.log(tasks);
    console.log(taskId);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    console.log(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
}

export { addCategoryToStorage, loadCategories, addTaskToLocalStorage, loadTasks, deleteTaskFromLocalStorage };