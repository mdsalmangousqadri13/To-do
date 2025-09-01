const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");


const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("youtubeTodoList"))
};

const addTodoListLocalStorage = (localTodoLists) => {
    return localStorage.setItem("youtubeTodoList", JSON.stringify(localTodoLists))
};

let localTodoLists = getTodoListFromLocal() || []; 

// Adding add to list dynamically
const addTodoDynamicElement = (curElem) => {
    const divElem = document.createElement("div");  // for create a div inside the html by the help of js
    divElem.classList.add("main_todo_div");
    divElem.innerHTML = `<li>${curElem}</li> <button class="deleteBtn">Delete</button>`  
    mainTodoElem.append(divElem);
};



const addTodoList = (e) => {
    e.preventDefault();
    const todoListValue = inputValue.value.trim();

    inputValue.value = "";  //it is use for clear the search box automatic after the enter value
    
    if( todoListValue != "" && !localTodoLists.includes(todoListValue)) {
    localTodoLists.push(todoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    console.log(localTodoLists)
    localStorage.setItem("youtubeTodoList",
    JSON.stringify(localTodoLists));

     addTodoDynamicElement(todoListValue)
    }
}

const showTodoList = () => {
    console.log(localTodoLists);
    
    localTodoLists.forEach((curElem) => [
        addTodoDynamicElement(curElem)
    ]);
}


showTodoList();

// for remove the value from existing data

const removeTodoElem = (e) => {
    const todoToRemove = (e.target)
    let todoListContent = todoToRemove.previousElementSibling.innerText;
    let parentElem = todoToRemove.parentElement;
    console.log(todoListContent);


    localTodoLists = localTodoLists.filter((curTodo) => {
        return curTodo != todoListContent;    
    });

    addTodoListLocalStorage(localTodoLists);
    parentElem.remove();

    console.log(localTodoLists);
    
}
    

mainTodoElem.addEventListener("click", (e) => {
    e.preventDefault();
    if(e.target.classList.contains("deleteBtn")){
        removeTodoElem(e);
    }
});

document.querySelector(".btn").addEventListener("click", (e) => {
    addTodoList(e);
})

