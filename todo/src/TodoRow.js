import React from 'react';

function TodoRow({item})
{    

    return (
        <tr>
            <td> { item.action } </td>
            <td> <input
                    type="checkbox"
                    checked={ item.done }                    
                    />
            </td>
        </tr>
    );
}

export default TodoRow;