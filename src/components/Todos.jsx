import React, { Component, useEffect, useRef, useState } from 'react';
import { getCookie } from './cookie';

function Todos() {
    const [todos, setTodos] = useState(null);
    const todosRef = useRef(null);
    const userId = getCookie('userId');
    

    useEffect(() => {
        const localTodos = localStorage.getItem('todos');
        if (localTodos) {
            setTodos(JSON.parse(localTodos));
            todosRef.current = JSON.parse(localTodos);
        }
        else {
            getTodos()
        }
        return () => {
            localStorage.setItem('todos', JSON.stringify(todosRef.current))
            console.log('2', todos);
        }
    }, [])

    const getTodos = async () => {
        if (!todos) {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
            const data = await res.json();
            console.log(data)
            todosRef.current = data;
            setTodos(data)
        }
    }

    function changeClassName(e) {
        const todosArr = [...todos];
        console.log(e.target);
        todosArr[e.target.id].completed === true ? todosArr[e.target.id].completed = false : todosArr[e.target.id].completed = true;
        console.log(todosArr[e.target.id].completed)
        setTodos(todosArr);
        todosRef.current = todosArr;
    }

    function sortByAB() {
        const todosArr = [...todos];
        todosArr.sort((a, b) => a.title.localeCompare(b.title));
        setTodos(todosArr)
        console.log(todos)
        todosRef.current = todosArr;
    }

    function randomSort() {
        const todosArr = [...todos];
        todosArr.sort((a, b) => a.title.localeCompare(b.title));
        setTodos(todosArr);
        console.log(todos);
    }

    return (
        <div className='main-content'>
            <h1>Todos</h1>
            <button onClick={sortByAB}>sort by AB</button>
            {todos && todos.map((todo, index) => {

                if (todo.completed) {
                    return (<div id={index} onClick={changeClassName} className='todo-completed' key={todo.id}>
                        {todo.title}</div>)
                }
                else {
                    return (<div id={index} onClick={changeClassName} className='todo' key={todo.id}>
                        {todo.title}</div>)
                }
            })}
        </div>
    );
}

export default Todos;