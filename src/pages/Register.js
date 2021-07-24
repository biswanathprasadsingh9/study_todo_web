import React, {Component} from 'react';
import { Grid, Button, Form, Input, TextArea } from 'semantic-ui-react'
import { NotificationManager } from 'react-notifications';
import axios from 'axios';


export default class Register extends Component {

    constructor(props){
        super(props)
        this.state={
            loadingForm:false,
            name:'',
            email:'',
            gender:'Male',
            phone:'',
            password:'',
            subject:'English',
            address:''
        }

        this.hanleTextChange = this.hanleTextChange.bind(this)
    }

    hanleTextChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
       
    }

    handleSubmit = e =>{

        this.setState({
            loadingForm:true
        })

        axios.post('http://localhost:5000/api/user/store',this.state)
        .then(response =>{
            console.log(response)
            if(response.data.response){

                this.setState({
                    loadingForm:false,
                    name:'',
                    email:'',
                    gender:'Male',
                    phone:'',
                    password:'',
                    subject:'English',
                    address:''
                })

                NotificationManager.success('Success');
                this.props.history.push('/login');
            }else{
                this.setState({loadingForm:false})
                NotificationManager.warning('Email already exist, please try anathor email id.');
            }
        })
    }

    render() {

        return (
            <>
            <h1>Register</h1>

            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>

                    </Grid.Column>

                    <Grid.Column width={12}>

                        <Form onSubmit={this.handleSubmit} loading={this.state.loadingForm}>

                            <Form.Group widths={2}>
                              <Form.Field label='Name' control={Input} name='name' placeholder='Name'  value={this.state.name} onChange={this.hanleTextChange} required   />
                              <Form.Field label='Email' control={Input} name='email' placeholder='Email' value={this.state.email} onChange={this.hanleTextChange} required />
                            </Form.Group>


                            <Form.Group inline widths={1}>
                                <label>Gender</label>
                                <Form.Field
                                    label='Male'
                                    control='input'
                                    type='radio'
                                    name='gender'
                                    value='Male'
                                    checked={this.state.gender==='Male'?true:false}
                                    onChange={this.hanleTextChange}
                                />
                                <Form.Field
                                    label='Female'
                                    control='input'
                                    type='radio'
                                    name='gender'
                                    value='Female'
                                    checked={this.state.gender==='Female'?true:false}
                                    onChange={this.hanleTextChange}
                                />
                            </Form.Group>

                            <Form.Group widths={2}>
                              <Form.Field label='Phone' control={Input} name='phone' placeholder='Phone' value={this.state.phone} onChange={this.hanleTextChange} required />
                              <Form.Field label='Password' control={Input} name='password' placeholder='Password' value={this.state.password} onChange={this.hanleTextChange} required />
                            </Form.Group>

                            <Form.Group widths={2}>

                            <Form.Field label='Subject' control='select' name="subject" value={this.state.subject} onChange={this.hanleTextChange} required >
                                <option value='Math'>Math</option>
                                <option value='English'>English</option>
                                <option value='Odia'>Odia</option>
                                <option value='Hindi'>Hindi</option>
                                <option value='History'>History</option>
                            </Form.Field>  

                              <Form.Field label='Address' control='TextArea' name='address' placeholder='Address' rows='1' value={this.state.address} onChange={this.hanleTextChange} required />
                             
                            </Form.Group>

                            <Form.Group>
                                <Form.Field control={Button}>Register</Form.Field>
                            </Form.Group>

                        </Form>

                    </Grid.Column>

                </Grid.Row>
            </Grid>
            

            </>
            

        );

    }

} 