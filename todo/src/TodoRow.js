import React, { useState } from 'react';

function TodoRow({ item, toggle, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.action);

  const onToggle = () => toggle(item);
  const onDelete = () => deleteTodo && deleteTodo(item);
  const onSave = () => {
    editTodo(item, editedText);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          item.action
        )}
      </td>
      <td>
        <input type="checkbox" checked={item.done} onChange={onToggle} />
      </td>
      <td>
        {/* Edit button only for incomplete todos */}
        {editTodo && !isEditing && (
          <button
            className="btn btn-sm btn-warning me-1"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        {isEditing && (
          <button
            className="btn btn-sm btn-success me-1"
            onClick={onSave}
          >
            Save
          </button>
        )}

        {/* Delete button only for completed todos */}
        {deleteTodo && (
          <button
            className="btn btn-sm btn-danger"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}

export default TodoRow;