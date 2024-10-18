import React from 'react';
import { Col, Row } from 'react-bootstrap';

const TodoItem = ({ item, updateComplete, deleteTask }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button
              onClick={() => deleteTask(item._id)}
              className="button-delete"
            >
              삭제
            </button>
            <button
              onClick={() => updateComplete(item._id)}
              className={`${
                item.isComplete ? 'item-complete' : 'button-delete'
              }`}
            >
              {item.isComplete ? `안끝남` : `끝남`}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
