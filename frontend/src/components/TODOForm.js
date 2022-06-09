import React from 'react'

class TODOForm extends React.Component {
    constructor(props) {
    super(props)
    this.state = {text: '', project:  props.projects[0]?.id, user:  props.users[0]?.id}
    }
    handleChange(event)
    {
        if(event.target.name === 'text'){
            this.setState({
                 [event.target.name]: event.target.value
            })
        } else if (event.target.name === 'user') {
            this.setState(
            {
                user: this.props.users.filter((item) => item.id == event.target.value)[0]
            })
        } else {
            this.setState(
            {
                project: this.props.projects.filter((item) => item.id == event.target.value)[0]

            })
        }

    }
    handleSubmit(event) {
        console.log(this.state.project)
        console.log(this.state.user)
        this.props.createTODO(this.state.text, this.state.project, this.state.user)
        event.preventDefault()
    }
    render() {
        return (
            <div className='container'>
                <form onSubmit={(event)=> this.handleSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="text">text</label>
                        <input type="text" className="form-control" name="text"
                        value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="project">project</label>
                        <select name="project" className='form-control'
                            onChange={(event)=>this.handleChange(event)}>
                            {this.props.projects.map((item)=><option
                            value={item.id}>{item.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="users">users</label>
                        <select name="user" className='form-control'
                            onChange={(event)=>this.handleChange(event)}>
                            {this.props.users.map((item)=><option
                            value={item.id}>{item.username}</option>)}
                        </select>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Save" />
                </form>
            </div>
            );
        }
    }

export default TODOForm
