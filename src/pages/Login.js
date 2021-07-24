import React, {Component} from 'react';
import { Grid, Button, Form, Input, TextArea, Icon } from 'semantic-ui-react'
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import cookie from 'react-cookies'


export default class Login extends Component {

    constructor(props){
        super(props)
        this.state={
            loadingForm:false,
            email:'',
            password:''
        }

        this.hanleTextChange = this.hanleTextChange.bind(this)
    }

    componentDidMount(){
        cookie.remove('userdata', { path: '/' })
        cookie.remove('userlogin', { path: '/' })
        cookie.remove('userid', { path: '/' })
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

        axios.post('http://localhost:5000/api/user/login',this.state)
        .then(response =>{
            console.log(response)

            if(response.data.response){

            cookie.remove('userdata', { path: '/' })
            cookie.remove('userlogin', { path: '/' })
            cookie.remove('userid', { path: '/' })


            var expires = new Date();
            expires.setSeconds(21600);
            cookie.save('userdata', response.data.data, { path: '/',expires });
            cookie.save('userid', response.data.data._id, { path: '/',expires });
            cookie.save('userlogin',true, { path: '/',expires })

            NotificationManager.success('Login Success');
            this.props.history.push('/')
            
            }else{
                this.setState({loadingForm:false})
                NotificationManager.warning(response.data.message);
            }
        })
    }

    render() {

        return (
            <>
            <h1>Login</h1>

            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>

                    </Grid.Column>

                    <Grid.Column width={12}>

                        <Form onSubmit={this.handleSubmit} loading={this.state.loadingForm}>

                            <Form.Group widths={2}>
                              <Form.Field label='Email' control={Input} name='email' placeholder='Email' value={this.state.email} onChange={this.hanleTextChange} required />
                              <Form.Field label='Password' control={Input} name='password' placeholder='Password' value={this.state.password} onChange={this.hanleTextChange} required />
                            </Form.Group>

                            <Form.Group widths={1}>
                                <Form.Field control={Button}>LogIn</Form.Field>
                            </Form.Group>

                        </Form>

                   
                     {/* <Button.Group>
                        <Button>
                        <Icon name='google' color='black' />
                        </Button>
                        <Button.Or />
                        <Button><Icon name='facebook' /></Button>
                        <Button.Or />
                        <Button><Icon name='twitter' /></Button>
                      </Button.Group> */}
                   

                    </Grid.Column>

                    

                </Grid.Row>
            </Grid>
            

            </>
            

        );

    }

} 