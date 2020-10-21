import React, { useState, useContext } from 'react';
import { apiBaseUrl } from '../../constant.config';
import { modalsShowHideContext } from '../../App';

function AddTodo(props) {
  const [todoFields, setTodoFields] = useState({
    title: '',
    completed: '',
  });

  const modalShowHide = useContext(modalsShowHideContext);

  const addTodoChangeHandler = (event) => {
    let todo = { ...todoFields };
    todo[event.target.name] = event.target.value;
    setTodoFields(todo);
  }

  const addTodoHandler = () => {
    let todo = { ...todoFields };
    const apiEndpoint = "todos";
    if (todo.completed === 'false' || todo.completed === 'true') {
      fetch(`${apiBaseUrl}/${apiEndpoint}`, {
        method: 'POST',
        body: JSON.stringify(todoFields),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      todo.title = "";
      todo.completed = "";
      setTodoFields(todo);
      props.getTodosData();
      console.warn("getTodosData();")
    } else {
      alert("Please enter only boolean values");
    }
  }

  const modalCloseHandler = () => {
    modalShowHide[1]({ todoModal: false });
  }

  return (
    <div>
      <div className="modal show" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Add New <span className="spl_name">Todo</span></h4>
              <button type="button" className="close" data-dismiss="modal" onClick={modalCloseHandler}>&times;</button>
            </div>

            <div className="modal-body">
              <div className="form-fields content_center">
                <div className="form">
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">Todo Title</label>
                    <input name="title"
                      className="form-control"
                      type="text" value={todoFields.title}
                      onChange={(event) => addTodoChangeHandler(event)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="completed" className="form-label">Todo Status</label>
                    <input name="completed"
                      className="form-control"
                      type="text" value={todoFields.completed}
                      onChange={(event) => addTodoChangeHandler(event)} />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-sm btn-info btn-block"
                      onClick={addTodoHandler}>Add Todo</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={modalCloseHandler}>Close</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTodo;
