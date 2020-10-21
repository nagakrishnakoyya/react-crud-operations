import React, { useState, useEffect, useContext } from 'react';
import { apiBaseUrl } from '../../constant.config';
import Loader from '../Loader';
import AddTodo from './AddTodo';
import { modalsShowHideContext } from '../../App';


function TodosList() {
  const [todos, setTodos] = useState([]);
  const modalShowHide = useContext(modalsShowHideContext);
  
  useEffect(() => {
    getTodosData();
  }, []);

  const getTodosData = () => {
    const apiEndpoint = "todos";
    fetch(`${apiBaseUrl}/${apiEndpoint}`)
      .then(res => res.json())
      .then(data => {
        data.map(todo => todo["isEditable"] = true);
        setTodos(data);
      })
      .catch(error => console.log(error))
  }

  const statusChangeHandler = (id) => {
    let todosList = [...todos];
    let todoIndex = todosList.findIndex(post => post.id === id);
    todosList[todoIndex].completed = !todosList[todoIndex].completed;
    setTodos([...todosList]);
  }

  const editTodoHandler = (id) => {
    let todosList = [...todos];
    let todoIndex = todosList.findIndex(post => post.id === id);
    if (todosList[todoIndex].completed === false) {
      todosList[todoIndex].isEditable = !todosList[todoIndex].isEditable;
      setTodos([...todosList]);
    }
  }

  const titleUpdateHandler = (event, id) => {
    let todosList = [...todos];
    let todoIndex = todosList.findIndex(post => post.id === id);
    todosList[todoIndex][event.target.name] = event.target.value;
    setTodos([...todosList]);
  }

  const updateTodoHandler = (id) => {
    let todosList = [...todos];
    const apiEndpoint = "todos";
    let todoIndex = todosList.findIndex(post => post.id === id);
    todosList[todoIndex].isEditable = !todosList[todoIndex].isEditable;
    fetch(`${apiBaseUrl}/${apiEndpoint}/${todosList[todoIndex].id}`, {
      method: 'PUT',
      body: JSON.stringify(todosList[todoIndex]),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    setTodos([...todosList]);
    getTodosData();
    console.log("Title updated");
  }

  const postDeleteHandler = (id) => {
    let todosList = [...todos];
    const apiEndpoint = "todos";
    let todoIndex = todosList.findIndex(post => post.id === id);
    fetch(`${apiBaseUrl}/${apiEndpoint}/${todosList[todoIndex].id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    setTodos([...todosList]);
    getTodosData();
  }

  const modalShowHandler = () => {
    modalShowHide[1]({todoModal:true});
  }

  const stringToBoolean =(statusValue)=>{
    switch(statusValue){
      case "true" :
        return statusValue = true;
      case "false" :
        return statusValue = false;
      default:
        return statusValue;
    }
  }
  return (
    <div id="users" className="px-3">
      <div style={{ height: "50px" }}>
        <h2 className="float-left">List of <span className="spl_name">Todos</span></h2>
        <button className="btn btn-info float-right" onClick={modalShowHandler}>Add New Todo</button>
      </div>
      <div className="users-list">
        <div className="row">
          {
            todos.length > 0 ? (
              todos.map(todo => {
                return (
                  <div className="col-lg-3 mb-30" key={todo.id} >
                    <div className="card">
                      <div className="card-body">
                        <div className="todo-text">
                          <ul className="list-unstyled">
                            <input
                              type="text"
                              className="form-control"
                              name="title" value={todo.title}
                              onChange={(event) => { titleUpdateHandler(event, todo.id) }}
                              disabled={stringToBoolean(todo.completed)}
                              readOnly={todo.isEditable}
                              style={stringToBoolean(todo.completed) ? { color: "red" } : { color: "#333" }} />
                          </ul>
                        </div>
                        <div className="todo-actions">
                          <ul className="list-unstyled styled-list">
                            <li title="Change Status">Status : <span><input type="checkbox" onChange={() => { statusChangeHandler(todo.id) }} checked={stringToBoolean(todo.completed)} /></span></li>
                            {
                              !stringToBoolean(todo.completed) && (
                                <>
                                  {
                                    todo.isEditable ? (
                                      <li title="Edit Todo" onClick={() => { editTodoHandler(todo.id) }}><i className="fas fa-edit"></i></li>
                                    ) : (
                                        <li title="Update Todo" onClick={() => { updateTodoHandler(todo.id) }}><i className="fas fa-sync-alt"></i></li>
                                      )
                                  }
                                </>
                              )
                            }

                            <li title="Delete Todo" onClick={() => { postDeleteHandler(todo.id) }}><i className="fas fa-trash-alt"></i></li>
                          </ul>
                        </div>

                      </div>
                    </div>
                  </div>
                )
              })
            ) :
              (<Loader loaderText="Loading posts" />)
          }
        </div>
        { modalShowHide[0].todoModal && <AddTodo getTodosData={getTodosData} />}
      </div>
    </div>
  )
}
export default TodosList;