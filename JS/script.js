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
              <h3 class="taskTitle"><img src="../image/icon.png" alt="" width="50" height="50">Task</h3>
              <p class="taskNumber"> Name - ${this.name}</p>
              <p class="taskNumber"> Description - ${this.description}</p>
              <button type="button" class=" btn btn-primary edit" data-id="${this.id}"
              type="button"  data-toggle="modal" data-target="#exampleModal"
              >Edit</button>
              <button type="button" class=" btn btn-primary delete" id="${this.id}">Delete</button>
             </li>`;
        }
    }

    init();

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
     * Add task object to taskList array
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
        const tName = input.value.trim();
        const tDescription = textArea.value.trim();
        if (tName !== '' && tDescription !== '') {
            const newTask = new Task(tName, tDescription);
            addTask(newTask);
            document.getElementById('input').value = '';
            document.getElementById('area').value = '';
            menu.classList.add('hide');
        } else {
            if (tName === "") {
                input.classList.add('error')
            }
            if (tDescription === '') {
                textArea.classList.add('error')
            }
        }
    }

    /**
     * Init function
     *
     */
    function init() {
        document.querySelector('input').addEventListener('keydown', function (event) {
            event.target.classList.remove('error');
            console.log(event.target)
        })
        document.querySelector('textarea').addEventListener('keydown', function (event) {
            event.target.classList.remove('error');
            console.log(event.target)
        })
        const task = new Task('Enter Name', 'Enter Description');
        addTask(task);
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
        /**
         *Edited tasks
         */
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
            document.getElementById('save').setAttribute('data-id', taskLength[0].id);
            $('#editModal').modal('show');
        }
    })

    /**
     * edit given task
     * @param task
     */

    function editTask(task) {
        taskList.forEach((element, index) => {
            if (element.id === task.id) {
                taskList[index] = task;
            }
        });
    }

    saveButton.addEventListener('click', function (event) {
        const editedName = taskName.value.trim();
        const editedDescription = taskDescription.value.trim();
        const saveId = event.target.getAttribute('data-id');
        if (editedName !== '' && editedDescription !== '') {
            const taskObject = new Task(editedName, editedDescription);
            taskObject.id = saveId;
            editTask(taskObject);
            $('#editModal').modal('hide');
            render();
        } else {
            if (editedName === "") {
                taskName.classList.add('error')
            }
            if (editedDescription === '') {
                taskDescription.classList.add('error')
            }
        }

    });
    document.querySelector('#inputEdit').addEventListener('keydown', function (event) {
        event.target.classList.remove('error')
    })
    document.querySelector('#areaEdit').addEventListener('keydown', function (event) {
        event.target.classList.remove('error')
    })
});




