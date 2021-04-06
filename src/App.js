import React, {useState, useRef, useCallback} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {

  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '한국사 시험 준비하기',
      checked: true,
    },
    {
      id: 2,
      text: '병원가기',
      checked: false,
    },
  ]);

  const nextId = useRef(3);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    }, [todos],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    }, [todos], 
  );

  const onToggle = useCallback(
    id =>{
      setTodos(
        todos.map(todo => 
          todo.id === id ? {...todo, checked: !todo.checked}: todo,
          ),
      );
    },[todos],
  );


  return(
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
