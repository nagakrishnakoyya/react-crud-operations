import React, { useState, createContext } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PostsList from './components/posts/PostsList';
import AddPost from './components/posts/AddPost';
import UsersList from './components/users/UsersList';
import TodosList from './components/todos/TodosList';
import Header from './components/Header';
import Home from './components/Home';
import EditPost from './components/posts/EditPost';
import PageNotFound from './components/PageNotFound';

export const modalsShowHideContext = createContext();


function App() {
  const [modalShoeHide, setModalShowHide] = useState({
    todoModal: false,
    editUserModal: false,
    addUserModal: false
  });
  return (
    <modalsShowHideContext.Provider value={[modalShoeHide, setModalShowHide]}>
      <div className="App">
        <BrowserRouter>
            <Header />

            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/home" exact component={Home} />
                <Route path="/posts" exact component={PostsList} />
                <Route path="/editpost" exact component={EditPost} />
                <Route path="/addpost" exact component={AddPost} />
                <Route path="/users" exact component={UsersList} />
                <Route path="/todos" exact component={TodosList} />

                <Route path="/**" exact component={PageNotFound} />
            </Switch>
        </BrowserRouter>
      </div>
    </modalsShowHideContext.Provider>
  );
}

export default App;
