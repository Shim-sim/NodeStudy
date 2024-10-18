import React from 'react';
import TodoItem from './TodoItem';

const TodoBoard = ({ todoList, updateComplete, deleteTask }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {!todoList.length ? (
        <h2>등록 된 리스트가 없습니다</h2>
      ) : (
        todoList.map((item) => (
          <TodoItem
            key={item._id}
            item={item}
            updateComplete={updateComplete}
            deleteTask={deleteTask}
          />
        ))
      )}
    </div>
  );
};

export default TodoBoard;
