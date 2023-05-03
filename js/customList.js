/* Most of this code was reused from my previous lab 'todo-list' as it was necessary for my custom.html page*/

var newTodoInput = document.getElementById('newTodo'); // text box
var addNewTodoButton = document.getElementById('addNewTodo'); // add button
var todoList = document.getElementById('todoList'); // todolist
var todoDoneList = document.getElementById('todoDoneList'); // todo done list
var boxToDoList = document.getElementById('listBox'); // todo done list box
var boxComToDoList = document.getElementById('comListBox'); // completed todo done list box

var todos = [];
var repeat = false; // Boolean value which checks for repeats

function addTodo(label) { // this function checks if there is any text in the text box aswell as it checks if theres repeats.
    if(label !== "") {
        
        var arrayLength = todos.length; //creates variable with the number of elements in the array 
        for(var i = 0;i < arrayLength; i++) { // for loop which will loop once for every element
            if(label == todos[i].todo){ //checks if whats in the textbox is equal to a string already in the array
                repeat = true; // if true than repeat is set to true
            }
        }
        if(repeat == false){ // if repeat is false then the element in the text box can be stored in the array
        todos.push({ todo: label, checked: false });
        updateTodos();
        }
         else{ // repeat changes back to false if true for the next element.
            repeat = false;
        }
    } 
}

addNewTodoButton.addEventListener("click", function(e) { // this is the function for reseting the text in the input box after add button is pressed. It also saves the input in the array.
    e.preventDefault();
    addTodo(newTodoInput.value);
    newTodoInput.value = "";
    console.log(todos);
});

function updateTodos() { // updates list after each input
    todoList.innerHTML = "";
    todoDoneList.innerHTML = "";
    todos.forEach(function(el) {
        var todo = document.createElement("li");
        todo.className = "todo";
        todo.innerText = el.todo;
        todo.addEventListener("click", function(e) {
            todos.forEach(function(el, i) {
                if(todos[i].todo === e.target.innerText) {
                    todos[i].checked = !todos[i].checked;updateTodos();
                }
            });
        });
        if(el.checked) {
            todoDoneList.appendChild(todo);
        } else {
            todoList.appendChild(todo);
        }
        
        
    });
    
    var todoItems = Array.from(todoList.querySelectorAll('li')).map(function(item) {
    return item.textContent;
  }); //creates an array of all of the elements in todoList

    var startRoulette = document.getElementById("start"); //Start button
//When start button clicked, random int will be generated between 0 and the number of elements in the list. this number will then be used to pick out an element from the todoList array using its index, the element in the array fills the inner text of element 'ruledesc'  
    startRoulette.addEventListener('click', function() { 
        var rnd = Math.floor(Math.random() * todoList.childElementCount);
        var randRules = todoItems[rnd];
        document.getElementById("ruledesc").innerText = randRules;
      });
    
}