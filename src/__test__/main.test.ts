/**
* @jest-environment jsdom
*/
import * as main from "../ts/main";
import * as func from "../ts/functions";
import { Todo } from "../ts/models/Todo";


beforeEach(() =>{
    document.body.innerHTML ="";
})
afterEach(() => {
	jest.restoreAllMocks();
});

/**
 * Testing function "createHtml"
 */

test("Should create HTML for all todos in list",()=>{
    
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    const list: Todo[] = [
        { text: 'Städa', done: false },
        { text: 'Laga Mat', done: false },
        { text: 'Sova', done: true }
	];

    const renderHtml = 
    '<ul id="todos" class="todo">' +
        '<li class="todo__text">Städa</li>' +
        '<li class="todo__text">Laga Mat</li>' +
        '<li class="todo__text--done todo__text">Sova</li>' +
   '</ul>'

    main.createHtml(list);

    expect(document.body.innerHTML).toBe(renderHtml);
})

/**
 * Testing function "toggleTodo"
 */

test("Should make toogleTodo call functions ",()=>{

    let spyCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();
    let spychangeTodo = jest.spyOn(func, "changeTodo").mockReturnValue();

    const todoItem: Todo = 
        {text: 'todo1', done: true} 
    ;
    main.toggleTodo(todoItem);
    expect(spyCreateHtml).toBeCalledTimes(1);
    expect(spyCreateHtml).toHaveBeenCalled();
    expect(spychangeTodo).toBeCalledTimes(1);
    expect(spychangeTodo).toHaveBeenCalled();
})

/**
 * Testing function "createNewTodo"
 */

describe("Scenarios for createNewTodo based on todo:Text length",()=>{
    
    test("Should create new todo and call createHtml()", () => {

        const spyCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();
        const spyDisplayError = jest.spyOn(main, "displayError").mockReturnValue();
   
        const todoText:string = 'Success testing'; //has to be longer than 2 letter to success
        const todoList: Todo[] = [];
        const result = func.addTodo(todoText, todoList);

        main.createNewTodo(todoText, todoList);
    
        expect(spyCreateHtml).toHaveBeenCalled();
        expect(spyCreateHtml).toHaveBeenCalledTimes(1);
        expect(spyDisplayError).toBeCalledTimes(0);
        expect(result.error).toBe("");
   });
   
   test("Should not create new todo and call displayError()", () => {

        const spyCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();
        const spyDisplayError = jest.spyOn(main, "displayError").mockReturnValue();

        const todoText:string = 'no'; //has to be longer than 2 letter to success
        const todoList: Todo[] = [];
        const result = func.addTodo(todoText, todoList);

        main.createNewTodo(todoText, todoList);
    
        expect(spyDisplayError).toHaveBeenCalled();
        expect(spyDisplayError).toHaveBeenCalledTimes(1);
        expect(spyDisplayError).toHaveBeenCalledWith(result.error, true);
        expect(result.error).toBe("Du måste ange minst tre bokstäver");
        expect(spyCreateHtml).toBeCalledTimes(0);
   });
   
});


/**
 * Testing function "displayError"
 */

describe("Should add/remove class depending on argument thrown", ()=>{

    test("IF true - Result will contains class show", () =>{
        //arrange
        let errorMsg:string = "error";
        document.body.innerHTML = `
            <div id="error"></div>
        `;
        //act
        main.displayError(errorMsg,true);
        //assert
        let result = document.getElementById("error") as HTMLDivElement; //We know it exists 
        expect(result.classList.contains('show')).toBeTruthy();
})
   
    test("IF false - Result will not contain class show", () =>{
        //arrange
        let errorMsg = "error";
        document.body.innerHTML = ` 
            <div id="error"></div>
        `;
        //act
        main.displayError(errorMsg,false);
        //assert
        let noResult = document.getElementById("error") as HTMLDivElement; 
        expect(noResult.classList.contains('show')).toBeFalsy();
    })
})

/**
 * Testing function "clearTodos"
 */

test("Check if functions is called 1 time", ()=>{

    let spyRemoveAllTodo = jest.spyOn(func, "removeAllTodos").mockReturnValue(); 
    let spyCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();
    const list: Todo[] = [
        {text: 'todo1', done: false}, 
        {text: 'todo2', done: false}
    ];
    //might remove
    document.body.innerHTML = `
    <ul class="todosContainer">
        <li></li>
        <li></li>
    </ul> 
    `;

    main.clearTodos(list);

    expect(spyCreateHtml).toBeCalledTimes(1);
    expect(spyCreateHtml).toHaveBeenCalled();
    expect(spyRemoveAllTodo).toBeCalledTimes(1);
    expect(spyRemoveAllTodo).toHaveBeenCalled();
})