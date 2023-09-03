import React, { Fragment, useState, useEffect } from "react";
import TodoItem from './TodoItem'
import AddTodo from "./AddTodo";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Todos = () => {
    const [todoState, setTodoState] = useState([])

    useEffect(() => {
        const getTodos = async () => {
            try {
                const res = await axios.get(
                    'https://jsonplaceholder.typicode.com/todos?_limit=10'
                )
                setTodoState(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getTodos()
    }, [])

    const markComplete = id => {
        const newTodos = todoState.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });

        setTodoState(newTodos);
    };

    const deleteTodo = async id => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            const newTodos = todoState.filter(todo => todo.id !== id)
            setTodoState(newTodos)
        } catch (error) {
            console.log(error.message)
        }
    }

    const addTodo = async title => {
        try {
            const res = await axios.post(
                'https://jsonplaceholder.typicode.com/todos',
                {
                    title,
                    completed: false
                }
            )
            const newTodos = [...todoState, res.data]
            setTodoState(newTodos)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Fragment>
            <AddTodo addTodoFunc={addTodo} />
            {todoState.map(todo => {
                return (
                    <TodoItem
                        key={todo.id}
                        todoProps={todo}
                        markCompleteFunc={markComplete}
                        deleteTodoFunc={deleteTodo}
                    />
                )
            })}
        </Fragment>
    )
}

export default Todos;
