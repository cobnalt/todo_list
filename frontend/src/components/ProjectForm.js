import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
    super(props)
    this.state = {name: '', link: '', users: [props.users[0]?.id]}
    }
    handleChange(event)
    {
        if(event.target.name === 'users'){
            let testUsers = [...event.target.options].filter(o => o.selected).map(o => o.value)

            this.setState(
                {
                    users: testUsers
                }
            )
        } else {
            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
        }

    }
    handleSubmit(event) {
        console.log(this.state.users)
        this.props.createProject(this.state.name, this.state.link, this.state.users)
        event.preventDefault()
    }
    render() {
        return (
            <div className='container'>
                <form onSubmit={(event)=> this.handleSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input type="text" className="form-control" name="name"
                        value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="link">link</label>
                        <input type="text" className="form-control" name="link"
                        value={this.state.link} onChange={(event)=>this.handleChange(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="users">users</label>
                        <select name="users" className='form-control' multiple={true}
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

export default ProjectForm
