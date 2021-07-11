import React, { Component } from 'react'
import axios from 'axios'
import {NotificationManager} from 'react-notifications';
import {Link} from 'react-router-dom'

export default class ViewTodo extends Component {
    
    state={
        data:false
    }

    componentDidMount(){

        axios.get(`http://localhost:5000/api/todo/${this.props.match.params.id}`)
        .then(response=>{
            if(response.data.response){
                this.setState({
                    data:response.data.data
                })
            }else{
                NotificationManager.warning('Wrong ID')
                this.props.history.push('/todolist')
            }
        })

    }


    render() {
        return (
            <>
            <h3>View Todo</h3>
            <br />
            <h5>Name: {this.state.data.name}</h5>
            <h5>Subject: {this.state.data.subject}</h5>
            <h5>Gender: {this.state.data.gender}</h5>
            <h5>About: {this.state.data.about}</h5>
            <br /><br />
            <Link exact to='/todolist'>Go Back</Link>
            </>
        )
    }
}
