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