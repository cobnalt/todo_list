import React from 'react'


const AuthorItem = ({user}) => {
    return (
        <li className="list-group-item"> {user.first_name} {user.last_name} </li>
    )
}

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.link}
            </td>
            <td>
                <ol className="list-group list-group-numbered list-group-flush">
                   {project.users.map(user => <AuthorItem user={user} />)}
                </ol>

            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <div className='container projectlist'>
            <div className='row'>
                <div className='col'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Link</th>
                                <th>Users</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => <ProjectItem project={project} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProjectList