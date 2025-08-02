class Task {
  constructor(name, description, dueDate, priority, category, id = null) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.category = category;
    this.id = id || Math.random().toString(36).substr(2, 6);
  }

getName() {   
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getDueDate() {
    return this.dueDate;
  }

  getPriority() {
    return this.priority;
  }
}

export default Task;
