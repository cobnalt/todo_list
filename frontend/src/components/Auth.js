import React from 'react'


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <div className="container">
            <div className="row">
            <div className="col-4">
                <form onSubmit={(event)=> this.handleSubmit(event)}>
                    <div className="mb-3">
                        <label htmlFor="form_login" className="form-label">Login</label>
                        <input type="text" name="login" placeholder="login" className="form-control" id="form_login"
                        value={this.state.login} onChange={(event)=>this.handleChange(event)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="form_password" className="form-label">Password</label>
                        <input type="password" name="password" placeholder="password" className="form-control" id="form_password"
                        value={this.state.password} onChange={(event)=>this.handleChange(event)} />
                    </div>
                    <input type="submit" value="Login" className="btn btn-primary mb-3" />
                </form>
            </div>
            </div>
            </div>
        );
    }
}

export default LoginForm