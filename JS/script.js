window.addEventListener('load', function () {
    let taskList = [];

    const input = document.getElementById('input');
    const textArea = document.getElementById('area');
    const button = document.getElementById('submit');
    const addNewTask = document.getElementById('btn');
    const menu = document.getElementById('menu');
    const saveButton = document.getElementById('save');
    const taskName = document.getElementById('inputEdit');
    const taskDescription = document.getElementById('areaEdit');
    /**
     * Opening input area
     */
    addNewTask.addEventListener('click', function (event) {
        if (event) {
            menu.classList.remove('hide')
            menu.style.textAlign = 'center'
        }
    })

    /**
     * class Task
     */
    class Task {
        constructor(name, description) {
            this.name = name;
            this.description = description;
            this.id = Date.now();
        }

        toMethod() {
            return `<li class="task card" >
              <p class="taskNumber"> Name - ${this.name}</p>
              <p class="taskNumber"> Description - ${this.description}</p>
              <button type="button" class=" btn btn-primary edit" data-id="${this.id}"
              type="button"  data-toggle="modal" data-target="#exampleModal"
              >Edit</button>
              <button type="button" class=" btn btn-primary delete" id="${this.id}">Delete</button>
             </li>`;
        }
    }

    /**
     * Render function
     */
    function render() {
        const listUi = document.getElementById('todoList');
        listUi.innerHTML = '';
        if (taskList.length === 0) {
            listUi.innerHTML = 'No tasks'
        }
        taskList.forEach(task => {
            listUi.innerHTML += task.toMethod()
        })
    }

    /**
     * Add task object to tasklist array
     * @param t object
     */

    function addTask(t) {
        taskList.push(t);
        render();
    }

    /**
     * Creating task list
     */
    function creatTask() {
        const tName = input.value;
        const tDescription = textArea.value;
        const newTask = new Task(tName, tDescription);
        addTask(newTask);
        document.getElementById('input').value = '';
        document.getElementById('area').value = '';
    }

    /**
     * Click function
     */
    button.addEventListener('click', creatTask)

    function deleteTask(id) {
        taskList = taskList.filter(function (task) {
                if (task.id != id)
                    return task;
            }
        );
        render();
    }


    const taskItem = document.querySelector('#todoList');
    /**
     * Deleting task
     */
    taskItem.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete')) {
            const msg = confirm('Are you sure?')
            if (msg) {
                deleteTask(event.target.id);
            } else {
                return false;
            }
        }
        let taskLength;
        if (event.target.classList.contains('edit')) {
            const taskId = event.target.getAttribute('data-id');
            taskLength = taskList.filter(function (t) {
                    if (t.id = taskId)
                        return t;
                }
            );

            document.getElementById('inputEdit').value = taskLength[0].name
            document.getElementById('areaEdit').value = taskLength[0].description

            document.getElementById('save').setAttribute('data-id',taskLength[0].id)
            $('#editModal').modal('show');
        }
    })
    /**
     * Save edited task
     */
    saveButton.addEventListener('click', function (event) {
        const editedName = taskName.value;
        const editedDescription = taskDescription.value;
        const saveId = event.target.getAttribute('data-id')

    })

})























