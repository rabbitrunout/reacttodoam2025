// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import TodoBanner from './TodoBanner';
import TodoRow from './TodoRow';
import TodoCreator from './TodoCreator';
import VisibilityControl from './VisibilityControl';

function App() {
  const [userName, setUserName] = useState("Irina");

  const [todoItems, setTodoItems] = useState([
    { action: "Buy Flowers", done: false },
    { action: "Get Shoes", done: false },
    { action: "Collect Tickets", done: true },
    { action: "Call Joe", done: false }
  ]);

  const [showCompleted, setShowCompleted] = useState(true);

  const createNewTodo = (task) => {
    if (!todoItems.find(item => item.action === task)) {
      const updatedTodos = [...todoItems, {action: task, done: false}];
      setTodoItems([...todoItems, { action: task, done: false }]);
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


  // const todoTableRows = (doneValue) => todoItems.filter(item => item.done === doneValue).map(item =>
  //   <TodoRow key={ item.action } item={ item } toggle={ toggleTodo } />
  // )

  useEffect(() => {
    try {
      const data = localStorage.getItem("todos");
      if(data)
      {
        const parsedData = JSON.parse(data);
        if(Array.isArray(parsedData)) {
          setTodoItems(parsedData);
        }
      }
      else {
  setUserName("Irina");
  setTodoItems([
    { action: "Buy Flowers", done: false },
    { action: "Get Shoes", done: false },
    { action: "Collect Tickets", done: true },
    { action: "Call Joe", done: false }
  ]);
  setShowCompleted(true);
}

    }
    catch(error) {
      console.error("Failed to load todos:", error);
    }
  },[])

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
          </tr>
        </thead>
        <tbody>
          {todoItems.filter(item => !item.done).map(item => (
            <TodoRow
              key={item.action}
              item={item}
              toggle={toggleTodo}
              // no deleteTodo prop passed here
            />
          ))}
        </tbody>
      </table>

      <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Completed Tasks"
            isChecked={showCompleted}
            callback={(checked) => setShowCompleted(checked)} />
        </div>

        {showCompleted && (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ width: "60%" }}>Description</th>
              <th style={{ width: "20%" }}>Done</th>
              <th style={{ width: "20%" }}>Actions</th> {/* Delete button */}
            </tr>
          </thead>
          <tbody>
            {todoItems.filter(item => item.done).map(item => (
              <TodoRow
                key={item.action}
                item={item}
                toggle={toggleTodo}
                deleteTodo={deleteTodo} // only passed here
              />
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default App;