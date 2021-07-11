import React, { Component } from 'react'
import {Table} from 'semantic-ui-react'
import axios from 'axios'
import Loader from "react-loader-spinner";
import {Link} from 'react-router-dom'
import {NotificationManager} from 'react-notifications';

export default class TodoList extends Component {

    state={
        todos:false
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/todo')
        .then(response=>{
            this.setState({
                todos:response.data.data
            })
        })
    }


    handleDelete=id=>{
        axios.get(`http://localhost:5000/api/todo/delete/${id}`)
        .then(response=>{
            if(response.data.response){
                axios.get('http://localhost:5000/api/todo')
                .then(response=>{
                    this.setState({
                        todos:response.data.data
                    })
                })
                NotificationManager.success('Success')
            }else{
                NotificationManager.warning('Wrong ID')

            }
        })

    }

    render() {
        return (
            <>
            {this.state.todos===false
                    ?
                    <>
                    <center>
                    <Loader
                        type="Rings"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                    </center>
                    </>
                    :
                    <>
                    <Table singleLine>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Subject</Table.HeaderCell>
                            <Table.HeaderCell>Gender</Table.HeaderCell>
                            <Table.HeaderCell>About</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            
                            {this.state.todos.map((todo)=>{
                                return(
                                    <Table.Row>
                                        <Table.HeaderCell>{todo.name}</Table.HeaderCell>
                                        <Table.HeaderCell>{todo.subject}</Table.HeaderCell>
                                        <Table.HeaderCell>{todo.gender}</Table.HeaderCell>
                                        <Table.HeaderCell>{todo.about}</Table.HeaderCell>
                                        <Table.HeaderCell> <Link style={{color:'blue'}} exact to={`/view/${todo._id}`}>View</Link> 
                                        &nbsp; <Link style={{color:'blue'}} exact to={`/edit/${todo._id}`}>Edit</Link> 
                                        &nbsp; <Link onClick={()=>this.handleDelete(todo._id)}>Delete</Link> </Table.HeaderCell>

                                    </Table.Row>
                                )
                            })}
                        
                            
                        </Table.Body>
                    </Table>
                    </>

            }
            
            </>
        )
    }
}
