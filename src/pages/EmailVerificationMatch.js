import React, { Component } from 'react'
import axios from 'axios'
import { NotificationManager } from 'react-notifications';
import cookie from 'react-cookies'


export default class EmailVerificationMatch extends Component {

    state={
        pageLoading:true,
    }

    componentDidMount(){

        var tempData={
            id:this.props.match.params.id,
            code:this.props.match.params.code
        }

        axios.post('http://localhost:5000/api/user/checkemailverificationcode',tempData)
        .then(response=>{
            console.log(response.data)
            if(response.data.response){

                cookie.remove('userdata', { path: '/' })


                var expires = new Date();
                expires.setSeconds(21600);
                cookie.save('userdata', response.data.data, { path: '/',expires });

                NotificationManager.success('Successfully verified');
                this.props.history.push('/')

            }else{
                NotificationManager.warning(response.data.message);
            }
        })

    }


    render() {
        return (
            <>
            {this.state.pageLoading
            ? <h2>Verifying please wait....</h2>
            :
            <>

            </>
            }
            </>
        )
    }
}
