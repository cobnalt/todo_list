import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import LoginForm from './components/Auth.js'
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import ProjectForm from './components/ProjectForm.js'
import TodoList from './components/Todo.js'
import TODOForm from './components/TODOForm.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated(){
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username,
        password: password})
        .then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
        'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
            {
                headers['Authorization'] = 'Token ' + this.state.token
            }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                this.setState({'users': response.data['results']})
            }).catch(error => {
                console.log(error)
                this.setState({'users': []})
            })

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                this.setState({'projects': response.data['results']})
            }).catch(error => {
                console.log(error)
                this.setState({'projects': []})
            })

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                this.setState({'todos': response.data['results']})
            }).catch(error => {
                console.log(error)
                this.setState({'todos': []})
            })
    }

    createProject(name, link, users) {
        const headers = this.get_headers()
        const data = {name: name, link: link, users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                let new_project = response.data
                const users = this.state.users.filter((item) => item.username ===
                new_project.users)
                new_project.users = users
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    createTODO(text, project, user) {
        const headers = this.get_headers()
        const data = {text: text, project: project, user: user}
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers})
            .then(response => {
                let new_todo = response.data
                const project = this.state.projects.filter((item) => item.id ===
                new_todo.project.id)[0]
                new_todo.project = project
                const user = this.state.users.filter((item) => item.id ===
                new_todo.user.id)[0]
                new_todo.user = user
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => console.log(error))
    }


    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({'projects': this.state.projects.filter(
                    (item) => item.id !== id)})
            }).catch(error => {
                console.log(error)
            })
    }

    deleteTODO(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers})
            .then(response => {
                this.setState({'todos': this.state.todos.filter(
                    (item) => item.id !== id)})
            }).catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render () {
        return (
            <div>
                <BrowserRouter>
                    <Header />
                        <nav>
                            <ul>
                                <li> {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>} </li>
                            </ul>
                        </nav>
                        <Routes>
                            <Route exact path='/' element={<UserList users={this.state.users} />} ></Route>
                            <Route exact path='/projects' element={<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} ></Route>
                            <Route exact path='/projects/create' element={<ProjectForm users={this.state.users} createProject={(name, link, users) => this.createProject(name, link, users)} />} ></Route>
                            <Route exact path='/todo' element={<TodoList todos={this.state.todos} deleteTODO={(id) => this.deleteTODO(id)} />} ></Route>
                            <Route exact path='/todo/create' element={<TODOForm users={this.state.users} projects={this.state.projects} createTODO={(text, project, user) => this.createTODO(text, project, user)} />} ></Route>
                            <Route exact path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} ></Route>
                        </Routes>
                    <Footer />
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
