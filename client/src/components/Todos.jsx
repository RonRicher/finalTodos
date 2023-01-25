import React, { Component, useEffect, useRef, useState } from "react";
import { useStateRef } from "../hooks/useStateRef";
import { getCookie } from "../js/cookie";
import { setLocalStorage } from "../js/localsessionStorage";

function Todos() {
  const [todos, setTodos, todosRef] = useStateRef(null);
  const userId = getCookie("userId");

  useEffect(() => {
    window.onbeforeunload = toLocalStorage;
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    } else {
      getTodos();
    }
    return () => {
      toLocalStorage();

    };
  }, []);

  const getTodos = async () => {
    try {
      if (!todos) {
        console.log("working");
        const res = await fetch(
          `http://localhost:8080/todos/showTodos/${userId}`
        );

        const data = await res.json();

        console.log(data);
        setTodos(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeTodoStatus = async (todoId, isDone) => {
    try {
      const res = await fetch(
        `http://localhost:8080/todos/changeTodoStatus`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            todoId: todoId,
            isDone: isDone
          })
        }
      );
      if (res.ok) {
        setTodos(todos.filter((todo) => todo.id !== todoId));
      } else {
        throw new Error(res.message);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };



  function toLocalStorage() {
    setLocalStorage("todos", todosRef.current);
  }

  const deleteTodo = async (todoId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/todos/deleteTodo`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            todoId: todoId
          })
        }
      );
      if (res.ok) {
        setTodos(todos.filter((todo) => todo.id !== todoId));
      } else {
        throw new Error(res.message);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  function changeStatusDone(e) {
    const todosArr = [...todos];
    const todoId = e.target.id;
    if (todos[todoId]) {
      if (todosArr[todoId].completed === 1) {
        changeTodoStatus(todoId, 0);
        todosArr[todoId].completed = 0;
      }
      else {
        changeTodoStatus(todoId, 1);
        (todosArr[todoId].completed = 1);
      }
      setTodos(todosArr);
    }
  }

  function sortByCompleted() {
    const todosArr = [...todos];
    todosArr.sort((a, b) => {
      if (a.completed) {
        return -1;
      }
      return 1;
    });
    console.log(todosArr);
    setTodos(todosArr);
  }

  function sortById() {
    const todosArr = [...todos];
    todosArr.sort((a, b) => a.id - b.id);
    setTodos(todosArr);
  }

  function sortByAB() {
    const todosArr = [...todos];
    todosArr.sort((a, b) => a.title.localeCompare(b.title));

    setTodos(todosArr);
  }

  function randomSort() {
    const todosArr = [...todos];
    todosArr.sort(() => 0.5 - Math.random());
    setTodos(todosArr);
  }

  return (
    <div className="main-content">
      <h1 style={{ margin: 50 }}>Todos</h1>
      <button className="sortButton" onClick={sortByAB}>
        sort by AB
      </button>
      <button className="sortButton" onClick={randomSort}>
        sort randomly
      </button>
      <button className="sortButton" onClick={sortByCompleted}>
        sort by completed
      </button>
      <button className="sortButton" onClick={sortById}>
        sort by id
      </button>
      {todos &&
        todos.map((todo, index) => {
          if (todo.completed) {
            return (
              <div
                id={index}
                onClick={changeStatusDone}
                className="todo-completed"
                key={todo.id}
              >
                {todo.title}
                <span
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                  className="bx bx-x-circle"
                ></span>
              </div>
            );
          } else {
            return (
              <div
                id={index}
                onClick={changeStatusDone}
                className="todo"
                key={todo.id}
              >
                {todo.title}
              </div>
            );
          }
        })}
    </div>
  );
}

export default Todos;
