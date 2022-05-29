import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import LoginForm from './components/Auth.js'
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
                            <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} ></Route>
                            <Route exact path='/todo' element={<TodoList todos={this.state.todos} />} ></Route>
                            <Route exact path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} ></Route>
                        </Routes>
                    <Footer />
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
