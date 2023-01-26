import { changeTodo, removeAllTodos, addTodo } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

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
    })

    test("Should not add new todo to todos array and display error message",()=>{
        const todoText:string ="No"; //not longer than 2 letter
        const list:Todo[] =[];
        let length = list.length;
    
        addTodo(todoText,list);
    
        expect(list.length).toBe(length);
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