import React from 'react'
import {Link} from 'react-router-dom'


const AuthorItem = ({user}) => {
    return (
        <li className="list-group-item"> {user.first_name} {user.last_name} </li>
    )
}

const ProjectItem = ({project, deleteProject}) => {
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
            <td><button onClick={()=>deleteProject(project.id)}
                  type='button'>Удалить</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => <ProjectItem project={project} deleteProject={deleteProject} />)}
                        </tbody>
                    </table>
                    <Link to='/projects/create'>Create</Link>
                </div>
            </div>
        </div>
    )
}

export default ProjectList