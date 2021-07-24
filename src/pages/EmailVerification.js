import React, { Component } from 'react'
import cookie from 'react-cookies'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class EmailVerification extends Component {

    state={
        data:cookie.load('userlogin'),
        userinfo:cookie.load('userdata')
    }

    

    render() {
        return(
            <>
            {this.state.data===undefined
            ?
            <>
            <Link exact to='/login'>Please login</Link>
            </>
            :
            <>
            <h2>Please click on this link for email verification</h2>
            <Link exact to={`/emailverificationmatch/${this.state.userinfo.email_verification_code}/${this.state.userinfo._id}`}>  http://localhost:3000/emailverificationmatch/{this.state.userinfo.email_verification_code}/${this.state.userinfo._id} </Link>
            
            </>
            }

            </>
        )
    }
}
