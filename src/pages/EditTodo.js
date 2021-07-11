import React, { Component } from 'react'
import {Form,Input, Button, TextArea} from 'semantic-ui-react'
import {NotificationManager} from 'react-notifications';
import axios from 'axios'

export default class EditTodo extends Component {

    constructor(props){
        super(props)
        this.state={
            loadingForm:false,
        }
        this.handleTextChnage=this.handleTextChnage.bind(this)
    }


    componentDidMount(){
        axios.get(`http://localhost:5000/api/todo/${this.props.match.params.id}`)
        .then(response=>{
            console.log(response.data.data)
            if(response.data.response){
                this.setState({
                    loadingForm:false,
                    _id:response.data.data._id,
                    name:response.data.data.name,
                    subject:response.data.data.subject,
                    gender:response.data.data.gender,
                    about:response.data.data.about,
                })
            }else{
                NotificationManager.warning('Wrong ID')
                this.props.history.push('/todolist')
            }
        })
    }



    handleTextChnage(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }


    handleSubmit=e=>{

        
       
        this.setState({
            loadingForm:true
        })

        axios.post(`http://localhost:5000/api/todo/update/todo`,this.state)
        .then(response=>{
            console.log(response.data)
            if(response.data.response){

                this.setState({
                    loadingForm:false,
                    name:'',
                    subject:'Odia',
                    gender:'Male',
                    about:'',
                })
                NotificationManager.success('Success');
                this.props.history.push('/todolist');

            }else{
                this.setState({
                    loadingForm:false
                })
                NotificationManager.warning('Failed')

            }
        })

    }


    render() {
        return (
            <>
            <h3>Edit Todo</h3>
            <Form onSubmit={this.handleSubmit} loading={this.state.loadingForm}>
                <Form.Field control={Input} label='Name' placeholder='First name' name="name" value={this.state.name} onChange={this.handleTextChnage} />
                
                <Form.Field label='Subject' control='select' name="subject" value={this.state.subject} onChange={this.handleTextChnage}>
                    <option value='Math'>Math</option>
                    <option value='English'>English</option>
                    <option value='Odia'>Odia</option>
                    <option value='Hindi'>Hindi</option>
                    <option value='History'>History</option>
                </Form.Field>
                
                <Form.Group grouped>
                    <label>Gender</label>
                    <Form.Field
                        label='Male'
                        control='input'
                        type='radio'
                        name='gender'
                        value="Male"
                        checked={this.state.gender==='Male'?true:false}
                        onChange={this.handleTextChnage}
                    />
                    <Form.Field
                        label='Female'
                        control='input'
                        type='radio'
                        name='gender'
                        value="Female"
                        checked={this.state.gender==='Female'?true:false}
                        onChange={this.handleTextChnage}
                    />
                </Form.Group>
                <Form.Field
                    control={TextArea}
                    label='About'
                    name="about"
                    value={this.state.about}
                    placeholder='Tell us more about you...'
                    onChange={this.handleTextChnage}
                />
                <Form.Field control={Button}>Submit</Form.Field>
                

            </Form>
            </>
        )
    }
}
