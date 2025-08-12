// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import TodoBanner from './TodoBanner';
import TodoRow from './TodoRow';
import TodoCreator from './TodoCreator';
 
function App() {
  const [userName] = useState("Irina");
 
  const [todoItems, setTodoItems] = useState([
    { action: "Buy Flowers", done: false },
    { action: "Get Shoes", done: false },
    { action: "Collect Tickets", done: true },
    { action: "Call Joe", done: false }
  ]);
 
  //const changeStateData = () => {
  //  setUserName(prevName => (prevName === "Irina" ? "Bob" : "Irina"));
  //};
 
  const createNewTodo = (task) => {
    if (!todoItems.find(item => item.action === task)) {
      setTodoItems([...todoItems, { action: task, done: false }]);
    }
  };
 
  return (
    <div className="container mt-3">
      <TodoBanner userName={userName} todoItems={todoItems} />
 
      <div class="m-3">
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
          {todoItems.map((item, index) => (            
            <TodoRow item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default App;