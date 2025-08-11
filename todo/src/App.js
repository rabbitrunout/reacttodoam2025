// import logo from './logo.svg';
import React, { useState } from 'react';
import TodoBanner from './TodoBanner';
import TodoRow from './TodoRow';
import './App.css';

function App() {
  const [userName] = useState("Irina");

  // const changeStateData = () => {
  //   setUserName(prevName => (prevName === "Irina" ? "Bob" : "Irina"));
  // };

   const [todoItems] = useState([
    { action: "Buy Flowers", done: false },
    { action: "Get Shoes", done: false },
    { action: "Collect Tickets", done: true },
    { action: "Call Joe", done: false }
  ]);

  return (
    <div>
      <TodoBanner userName={userName} todoItems={todoItems} />

      {/* <button
        className="btn btn-primary m-2"
        onClick={changeStateData}>
          
        Change
      </button> */}
      

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
