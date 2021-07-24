import 'semantic-ui-css/semantic.min.css'
import Body from './include/Body'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {ProtectedRouteUser} from './auth/auth'


import Home from './pages/Home'
import CreateTodo from './pages/CreateTodo';
import TodoList from './pages/TodoList';
import ViewTodo from './pages/ViewTodo'
import EditTodo from './pages/EditTodo'

import Login from './pages/Login'
import Register from './pages/Register'
import EmailVerification from './pages/EmailVerification'
import EmailVerificationMatch from './pages/EmailVerificationMatch'

function App() {
  return (
    <>
    <Router>
        <Body>
          <Switch>
            <ProtectedRouteUser exact path='/' component={Home} />
            <ProtectedRouteUser exact path='/createtodo' component={CreateTodo} />
            <ProtectedRouteUser exact path='/todolist' component={TodoList} />
            <ProtectedRouteUser exact path='/view/:id' component={ViewTodo} />  
            <ProtectedRouteUser exact path='/edit/:id' component={EditTodo} />  


            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />

            <Route exact path='/emailverification' component={EmailVerification} />
            <Route exact path='/emailverificationmatch/:code/:id' component={EmailVerificationMatch} />


          
          </Switch>
          <NotificationContainer/>
        </Body>
    </Router>
    </>
  );
}

export default App;
