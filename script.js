let tasks = []; 

tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Show all tasks
let todoList = document.getElementById("todo-list")
todoList.innerHTML = ""
updateLocalStorage()
renderTasks()

// To be able to swaping between the filters
let currentFilter = "All"
function setFilter(filter)
{
    currentFilter = filter;
    updateLocalStorage()
    renderTasks(filter); // تحديث المهام بناءً على الفلتر المحدد

    // إزالة الـ active من جميع الأزرار وإضافته للزر المحدد فقط
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    // إضافة `active` للزر النشط فقط
    document.querySelector(`.filter-btn[onclick="setFilter('${filter}')"]`).classList.add("active");
}

// 1 - Rendering all tasks on seceific filter
function renderTasks(filter = "All")
{
    todoList.innerHTML = ""; // تفريغ القائمة قبل إعادة ملئها
    let filteredTasks = tasks;

    // تطبيق الفلتر المطلوب
    if (filter === "Active") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === "Completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "Today") { 
        let now = new Date();
        let year = now.getFullYear();
        let month = String(now.getMonth() + 1).padStart(2, "0");
        let day = String(now.getDate()).padStart(2, "0");
        
        const today = `${year}-${month}-${day}`; // Get local YYYY-MM-DD format    
        filteredTasks = tasks.filter(task => task.date.startsWith(today)); 
    }
    // إنشاء قائمة المهام بناءً على الفلتر المحدد
    filteredTasks.forEach((task, index) => {
        todoList.innerHTML += `
        <li class="todo-item ${task.completed ? 'completed' : ''}">
            <div class="todo-content">
                <span class="todo-text update-title">${task.title}</span>
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
                    <span class="todo-timestamp">${task.date}</span>
                </div>
            </div>
            <div class="todo-actions">
                ${task.completed  
                    ? `<button onclick='toggleTaskCompletion(${index})' class="action-btn action-btn-complete" aria-label="Mark as uncomplete">↺</button>` 
                    : `<button onclick="toggleTaskCompletion(${index})" class="action-btn action-btn-complete" aria-label="Mark as complete">✓</button>`  
                } 
                <button onclick="updateTask(${index})" class="action-btn update-task action-btn-edit" aria-label="Edit task">✎</button>
                <button onclick="deleteTask(${index})" class="action-btn delete-task action-btn-delete" id="delete-btn" aria-label="Delete task">×</button>
            </div>
        </li>`;
    });
}

// 2 - Create Task 'C'
document.getElementById("add-btn").addEventListener("click", function () {
    let newTask = document.getElementById("todo-input").value
    tasks.push({
        "title": newTask, 
        "date": getCurrentFormattedDate(),
        "completed": false
    }); 
    updateLocalStorage()
    renderTasks();
});

// 3 - Update Task 'U'
function updateTask(index)
{ 
    // Get the title from the current element
    let taskTitle = document.getElementsByClassName("update-title")[index].textContent; 
    
    // Show the title in edit input field for editing
    document.getElementById("edit-input").value = taskTitle; 
    
    // When clicking the submit button
    document.getElementById("edit-submit-btn").onclick = function () {
        let newTaskTitle = document.getElementById("edit-input").value;
        let newTaskDate = document.getElementById("edit-date-input")?.value; // جلب التاريخ من حقل الإدخال
        
        // Update The Title
        tasks[index].title = newTaskTitle;
        
        
        // Check if ["There is Date", "Valid Date", "Not Equal To The Prev Date"]
        if (newTaskDate && !isNaN(Date.parse(newTaskDate)) && newTaskDate !== tasks[index].date) {
            tasks[index].date = newTaskDate;
        }

        // Call update local storage methode for listen to updating
        updateLocalStorage()

        // Make the edit input empty after editing
        document.getElementById("edit-input").value = ""
        
        // Updating UI
        renderTasks();

    };
}

// 4 - Delete Task 'D'
function deleteTask(index)
{
    // Get the title for the current task for show it in alert message
    let taskTitle = document.getElementsByClassName("update-title")[index].textContent;
    
    // Prompt alert message for the user to confirm the deleting
    let action = confirm("You Are Sure To Delete - " + taskTitle)

    // Chick if the action is true or false - delete the task by "Splice Function if the action is true" - Updating the UI
    if (action) {
        tasks.splice(index, 1);
        updateLocalStorage()
        renderTasks();
    }
}

// 5 - Toggle Tasks Completion [true, false]
function toggleTaskCompletion(index)
{
    let task = tasks[index]
    task.completed = !task.completed;
    updateLocalStorage()
    renderTasks(currentFilter); // تحديث القائمة بناءً على الفلتر الحالي
}

function updateLocalStorage()
{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function getCurrentFormattedDate()
{
    let now = new Date(); 
    let year = now.getFullYear(); 
    let month = String(now.getMonth() + 1).padStart(2, "0"); 
    let day = String(now.getDate()).padStart(2, "0"); 
    let hours = String(now.getHours()).padStart(2, "0"); 
    let minutes = String(now.getMinutes()).padStart(2, "0"); 
    let seconds = String(now.getSeconds()).padStart(2, "0"); 

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}