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

import Home from './pages/Home'
import CreateTodo from './pages/CreateTodo';
import TodoList from './pages/TodoList';

function App() {
  return (
    <>
    <Router>
        <Body>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/createtodo' component={CreateTodo} />
            <Route exact path='/todolist' component={TodoList} />
          </Switch>
          <NotificationContainer/>
        </Body>
    </Router>
    </>
  );
}

export default App;
