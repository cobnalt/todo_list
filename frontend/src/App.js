import React from 'react'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data['results']
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data['results']
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const todos = response.data['results']
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    render () {
        return (
            <div>
                <BrowserRouter>
                    <Header />
                        <Routes>
                            <Route exact path='/' element={<UserList users={this.state.users} />} ></Route>
                            <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} ></Route>
                            <Route exact path='/todo' element={<TodoList todos={this.state.todos} />} ></Route>
                        </Routes>
                    <Footer />
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
