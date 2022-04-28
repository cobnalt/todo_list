import React from 'react'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <div className='container userlist'>
            <div className='row'>
                <div className='col'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => <UserItem user={user} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserList