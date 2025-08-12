import React from 'react';

function TodoRow({ item, toggle, deleteTodo }) {
  const onToggle = () => toggle(item);
  const onDelete = () => deleteTodo && deleteTodo(item);

  return (
    <tr>
      <td>{item.action}</td>
      <td>
        <input type="checkbox" checked={item.done} onChange={onToggle} />
      </td>
      {deleteTodo && (
        <td>
          <button className="btn btn-danger btn-sm" onClick={onDelete}>
            Delete
          </button>
        </td>
      )}
    </tr>
  );
}

export default TodoRow;