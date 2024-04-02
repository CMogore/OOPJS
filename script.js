// Task class
class Task {
    constructor(title, id) {
      this.id = id;
      this.title = title;
      this.completed = false;
    }
  
    toggleCompleted() {
      this.completed = !this.completed;
    }
  
    render() {
      const completedClass = this.completed ? 'completed' : '';
      return `<li class="task ${completedClass}" id="task-${this.id}">
                <input type="checkbox" onchange="toggleTaskCompleted(${this.id})" ${this.completed ? 'checked' : ''}>
                <span>${this.title}</span>
                <button onclick="deleteTask(${this.id})">Delete</button>
              </li>`;
    }
  }
  
  // TaskManager class
  class TaskManager {
    constructor() {
      this.tasks = [];
      this.currentId = 0;
    }
  
    addTask(title) {
      const task = new Task(title, this.currentId);
      this.currentId++;
      this.tasks.push(task);
      this.render();
    }
  
    toggleTaskCompleted(id) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.toggleCompleted();
        this.render();
      }
    }
  
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.render();
    }
  
    render() {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
      this.tasks.forEach(task => {
        taskList.innerHTML += task.render();
      });
    }
  }
  
  const taskManager = new TaskManager();
  
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskTitle = taskInput.value.trim();
    if (taskTitle !== '') {
      taskManager.addTask(taskTitle);
      taskInput.value = '';
    } else {
      alert('Please enter a task');
    }
  }
  
  function toggleTaskCompleted(id) {
    taskManager.toggleTaskCompleted(id);
  }
  
  function deleteTask(id) {
    taskManager.deleteTask(id);
  }
  