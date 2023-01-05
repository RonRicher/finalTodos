import React, { Component, useEffect, useRef, useState } from 'react';
import { useStateRef } from '../hooks/useStateRef';
import { getCookie } from "../js/cookie";


function Todos() {
    const [todos, setTodos, todosRef] = useStateRef(null);
    
    const userId = getCookie('userId');


    useEffect(() => {
        const localTodos = localStorage.getItem('todos');
        if (localTodos) {
            setTodos(JSON.parse(localTodos));
        }
        else {
            getTodos()
        }
        return () => {
            localStorage.setItem('todos', JSON.stringify(todosRef.current))
        }
    }, [])

    const getTodos = async () => {
        if (!todos) {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
            const data = await res.json();
            setTodos(data)
        }
    }

    function changeClassName(e) {
        const todosArr = [...todos];
        todosArr[e.target.id].completed === true ? todosArr[e.target.id].completed = false : todosArr[e.target.id].completed = true;
        setTodos(todosArr);

    }

    function sortByAB() {
        const todosArr = [...todos];
        todosArr.sort((a, b) => a.title.localeCompare(b.title));
        setTodos(todosArr)
    }

    function randomSort() {
        const todosArr = [...todos];
        todosArr.sort((a, b) => a.title.localeCompare(b.title));
        setTodos(todosArr);
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