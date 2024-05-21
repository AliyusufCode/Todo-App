import { useAppSelector } from "../../redux/hooks";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TodoItem from "../TodoItem/TodoItem";
import "./styles.css";
const TodoList = () => {
  const state = useAppSelector((state) => state.todos);
  return (
    <div>
      <TransitionGroup component="ul" className="list-group">
        {state.todos.map((todo, index) => (
          <CSSTransition timeout={800} classNames={"todo"} key={todo.id}>
            <TodoItem key={todo.id} todo={todo} index={index} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default TodoList;
