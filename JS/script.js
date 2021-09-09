window.addEventListener('load', function () {
    let taskList = [];

    const input = document.getElementById('input');
    const textArea = document.getElementById('area');
    const button = document.getElementById('submit');
    const addNewTask = document.getElementById('btn');
    const menu = document.getElementById('menu');

    addNewTask.addEventListener('click', function (event) {
        if (event) {
            menu.classList.remove('hide')
            menu.style.textAlign = 'center'
        }
    })

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
              <button type="button" class=" btn btn-lg btn-primary" data-id="${this.id}">Edit</button>
              <button type="button" class=" btn btn-lg btn-primary delete" id="${this.id}">Delete</button>
             </li>`;
        }
    }

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


    function addTask(t) {
        taskList.push(t);
        render();
    }

    function creatTask() {
        const tName = input.value;
        const tDescription = textArea.value;
        const newTask = new Task(tName, tDescription);
        addTask(newTask);
        document.getElementById('input').value = '';
        document.getElementById('area').value = '';
    }

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

    taskItem.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete')){
            const msg = confirm('Are you sure?')
            if (msg){
                deleteTask(event.target.id);
            }else{
                return false;
            }
        }
    })
})























