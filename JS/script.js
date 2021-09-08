window.addEventListener('load', function () {
    let taskList = [];

    const input = document.getElementById('input');
    const textArea = document.getElementById('area');
    const button = document.getElementById('submit');
    const addNewTask = document.getElementById('btn');
    const menu = document.getElementById('menu')
    addNewTask.addEventListener('click',function (event){
        if (event){
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
            return `<div class="task">
              <li class="taskNumber"> Name - ${this.name}</li>
              <li class="taskNumber"> Description - ${this.description}</li>
              <button type="button" class=" btn btn-lg btn-primary">Edit</button>
              <button type="button" class=" btn btn-lg btn-primary" id="${this.id}">Delete</button>
             </div>`;
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
        const newTask = new Task(tName,tDescription)
        addTask(newTask)
    }
button.addEventListener('click',creatTask)



})























