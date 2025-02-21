let taskInput = document.querySelector('#main-input-box input');
let list = document.querySelector('.ul');
let listItem = document.querySelectorAll('li');
let removeBtn = document.querySelector('.remove-button');

taskInput.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        taskAddition();
    }
})

function taskAddition() {
    let tasks = document.createElement('li');
    let inputValue = (taskInput.value).trim();

    if (inputValue === "") return;

    tasks.innerHTML = "<input type='checkbox' class='checkbox'>" + inputValue;

    list.append(tasks);
    taskInput.value = "";
}

list.addEventListener('click', function (event) {
    if (event.target.nodeName == 'INPUT' && event.target.type === 'checkbox') {
        // event.target.parentElement.remove();
        let listTask = event.target.parentElement;
        listTask.classList.toggle('complete');
    }
})

list.addEventListener('click', function (event) {
    if (event.target.nodeName == 'INPUT') {
        let listTask = event.target;
        // console.dir(listTask);
        if (listTask.checked == true) {
            removeBtn.addEventListener('click', function () {
                if (listTask.checked == true) {
                    listTask.parentElement.remove();
                }
            })
        }
    }
})