document.addEventListener('DOMContentLoaded', (event) => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    function renderTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="complete-task-button">Concluir</button>
                    <button class="remove-task-button">Remover</button>
                </div>
            `;
            taskList.appendChild(taskItem);

            const completeButton = taskItem.querySelector('.complete-task-button');
            const removeButton = taskItem.querySelector('.remove-task-button');

            completeButton.addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks(tasks);
                renderTasks(tasks);
            });

            removeButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks(tasks);
                renderTasks(tasks);
            });
        });
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            const tasks = getTasks();
            tasks.push({ text: taskText, completed: false });
            saveTasks(tasks);
            renderTasks(tasks);
            newTaskInput.value = '';
        }
    });

    renderTasks(getTasks());
});

