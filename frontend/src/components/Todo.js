import React from 'react'


const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.project.name}
            </td>
            <td>
                {todo.user.first_name} {todo.user.last_name}
            </td>
            <td>
               {todo.is_active.toString()}
            </td>
            <td>
                {todo.created}
            </td>
            <td>
                {todo.updated}
            </td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
        <div className='container todolist'>
            <div className='row'>
                <div className='col'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>Text</th>
                                <th>Project</th>
                                <th>User</th>
                                <th>Is active</th>
                                <th>Created</th>
                                <th>Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map(todo => <TodoItem todo={todo} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TodoList