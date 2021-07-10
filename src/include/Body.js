import React, { Component } from 'react'
import { Container, Menu, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class Body extends Component {
    render() {
        return (
            <>
                <Menu>
                    <Menu.Item>
                         <Link exact to='/'><Button>Home</Button></Link>
                    </Menu.Item>

                    <Menu.Item>
                    <Link exact to='/todolist'><Button>Todo List</Button></Link>
                    </Menu.Item>

                    <Menu.Item>
                    <Link exact to='/createtodo'><Button>Create Todo</Button></Link>
                    </Menu.Item>
                </Menu>
                <br />
                <Container>
                    {this.props.children}
                </Container>
                

                {/* <footer>
                    <p>Footer</p>
                </footer> */}
            </>
        )
    }
}
