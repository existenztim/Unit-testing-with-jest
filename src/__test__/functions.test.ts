/**
* @jest-environment jsdom
*/

import { changeTodo, removeAllTodos, addTodo, sortTodo } from "../ts/functions";
import * as main from "../ts/main";
import { Todo } from "../ts/models/Todo";

beforeEach(() =>{
    document.body.innerHTML ="";
})
afterEach(() => {
	jest.restoreAllMocks();
});

/**
 * Testing function "sortTodo"
 */

test("Should sort the list based on property:done value",()=>{
  
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    // written unsorted on purpose
    const sortedList: Todo[] = [
        { text: 'Basta', done: false },
        { text: 'Simma', done: true },
        { text: 'Duscha', done: true },
        { text: 'Arbeta', done: false }
	];
    
    const renderHtml = 
    '<ul id="todos" class="todo">' +
        '<li class="todo__text">Arbeta</li>' +
        '<li class="todo__text">Basta</li>' +
        '<li class="todo__text--done todo__text">Duscha</li>' +
        '<li class="todo__text--done todo__text">Simma</li>' +
   '</ul>'
   main.createHtml(sortedList);
   sortTodo(sortedList);

   expect(document.body.innerHTML).toBe(renderHtml);
   expect(sortedList[0].done).toBe(false);
   expect(sortedList[1].done).toBe(false);
   //true values should come last
   expect(sortedList[2].done).toBe(true);
   expect(sortedList[3].done).toBe(true);
})


/**
 * Testing function "addTodo"
 */

describe("Should add or not add a new todo if todoText >2",() =>{

    test("Should add new todo to todos array",()=>{
        const todoText:string ="Äta mat"; //longer than 2 letter
        const list:Todo[] =[];
        let length = list.length;
    
        addTodo(todoText,list);
    
        expect(list.length).toBe(length + 1);
        expect(list[list.length-1].text).toBe("Äta mat");
    })

    test("Should not add new todo to todos array and display error message",()=>{
        const todoText:string ="No"; //not longer than 2 letter
        const list:Todo[] =[];
        let length = list.length;
    
        addTodo(todoText,list);
    
        expect(list.length).toBe(length); //no change in length
    })
    
})

/**
 * Testing function "changeTodo"
 */

test("This should toggle the done boolean in the todos",()=>{

    const todoText = "Gå till gymmet";
    const trueTodoItem  = new Todo(todoText, true);
    const falseTodoItem  = new Todo(todoText, false);

    changeTodo(trueTodoItem);
    changeTodo(falseTodoItem);

    expect(trueTodoItem.done).toBeFalsy();
    expect(falseTodoItem.done).toBeTruthy();
})

/**
 * Testing function "removeAllTodos"
 */

test("This should remove all todos", () =>{

    const todos: Todo[] = [
        {text: 'todo1', done: true}, // the boolean value shouldn't matter
        {text: 'todo2', done: false},
        {text: 'todo3', done: true}
    ];
    removeAllTodos(todos);
    const length = todos.length;
    expect(length).toBe(0);
})