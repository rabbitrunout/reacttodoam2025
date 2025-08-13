import React, { useState, useEffect } from 'react';
import './App.css';
import TodoBanner from './TodoBanner';
import TodoRow from './TodoRow';
import TodoCreator from './TodoCreator';
import VisibilityControl from './VisibilityControl';

function App() {
  const [userName, setUserName] = useState("Doug");
  const [todoItems, setTodoItems] = useState([
    { action: "Buy Flowers", done: false },
    { action: "Get Shoes", done: false },
    { action: "Collect Tickets", done: true },
    { action: "Call Joe", done: false }
  ]);
  const [showCompleted, setShowCompleted] = useState(true);

  const createNewTodo = (task) => {
    if (!todoItems.find(item => item.action === task)) {
      const updatedTodos = [...todoItems, { action: task, done: false }];
      setTodoItems(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const toggleTodo = (todo) => {
    const updatedTodos = todoItems.map((item) =>
      item.action === todo.action
        ? { ...item, done: !item.done }
        : item
    );
    setTodoItems(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (todo) => {
    if (todo.done) {
      const updatedTodos = todoItems.filter(item => item.action !== todo.action);
      setTodoItems(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const editTodo = (oldItem, newAction) => {
    const updatedTodos = todoItems.map(item =>
      item.action === oldItem.action ? { ...item, action: newAction } : item
    );
    setTodoItems(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const clearCompleted = () => {
    const updatedTodos = todoItems.filter(item => !item.done);
    setTodoItems(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  useEffect(() => {
    try {
      const data = localStorage.getItem("todos");
      if (data) {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          setTodoItems(parsedData);
        }
      } else {
        // Если в localStorage ничего нет — сбрасываем в дефолт
        setUserName("Doug");
        setTodoItems([
          { action: "Buy Flowers", done: false },
          { action: "Get Shoes", done: false },
          { action: "Collect Tickets", done: true },
          { action: "Call Joe", done: false }
        ]);
        setShowCompleted(true);
      }
    } catch (error) {
      console.error("Failed to load todos:", error);
    }
  }, []);

  return (
    <div className="container mt-3">
      <TodoBanner userName={userName} todoItems={todoItems} />

      <div className="m-3">
        <TodoCreator callback={createNewTodo} />
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Action</th>
            <th>Done</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todoItems.filter(item => !item.done).map(item => (
            <TodoRow
              key={item.action}
              item={item}
              toggle={toggleTodo}
              editTodo={editTodo}
            />
          ))}
        </tbody>
      </table>

      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl
          description="Completed Tasks"
          isChecked={showCompleted}
          callback={(checked) => setShowCompleted(checked)}
        />
      </div>

      {showCompleted && (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ width: "60%" }}>Description</th>
              <th style={{ width: "20%" }}>Done</th>
              <th style={{ width: "20%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todoItems.filter(item => item.done).map(item => (
              <TodoRow
                key={item.action}
                item={item}
                toggle={toggleTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </tbody>
        </table>
      )}

      {todoItems.some(item => item.done) && (
        <div className="text-center mt-3">
          <button
            className="btn btn-danger"
            onClick={clearCompleted}
          >
            Clear All Completed
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
