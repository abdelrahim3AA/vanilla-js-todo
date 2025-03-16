let tasks = [
    {
        "title": "Complete the project proposal", 
        "date": "03-06-2025",
        "completed": true
    },
    {
        "title": "Make some diner for alsouhour", 
        "date": "03-06-2025",
        "completed": false
    },
    {
        "title": "Go to the maghrep's prayer", 
        "date": "03-06-2025",
        "completed": true
    },
    {
        "title": "Finsh my tasks today", 
        "date": "03-06-2025",
        "completed": true
    }
]; 

let todoList = document.getElementById("todo-list")
todoList.innerHTML = ""

getAllTasks()

// 2 - Create a new task 'C'
document.getElementById("add-btn").addEventListener("click", function () {
    let newTask = document.getElementById("todo-input").value
    tasks.push({
        "title": newTask, 
        "date": "03-06-2025",
        "completed": true
    }); 
    getAllTasks();
});



function getAllTasks()
{
    todoList.innerHTML = ""
    for (task of tasks) {
        todoList.innerHTML += `
        <li class="todo-item ${task.completed ? 'completed' : ''}">
            <div class="todo-content">
                <span class="todo-text">${task.title}</span>
                <div class="todo-date">
                    <span class="calendar-icon">
                        <!-- Mini calendar icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                    </span>
                    <span class="todo-timestamp">Due: March 20, 2025</span>
                </div>
            </div>
            <div class="todo-actions">
                <button class="action-btn action-btn-complete" aria-label="Mark as complete">✓</button>
                <button class="action-btn action-btn-edit" aria-label="Edit task">✎</button>
                <button class="action-btn action-btn-delete" aria-label="Delete task">×</button>
            </div>
        </li>
        `                
    }
}
