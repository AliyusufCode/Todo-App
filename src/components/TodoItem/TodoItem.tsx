import "./styles.css";
import { ITodo } from "../../types/types";
import { useAppDispatch } from "../../redux/hooks";
import {
  deleteTodo,
  todoClicked,
  todoFinish,
} from "../../redux/Slices/TodoSlice";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import OpennedChangeMenu from "../OpennedChangeMenu/OpenedChange";
const TodoItem = ({ todo, index }: { todo: ITodo; index: number }) => {
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let newTimeoutId: any;
    if (todo.done) {
      newTimeoutId = setTimeout(() => {
        onClickRemove(todo.id);
      }, 5000);
    }
    setTimeoutId(newTimeoutId);
    return () => {
      if (newTimeoutId) {
        clearTimeout(newTimeoutId);
      }
    };
  }, [todo.done, todo.id]);
  const dispatch = useAppDispatch();
  const onClickRemove = (id: number) => {
    dispatch(deleteTodo(id));
  };
  const onClickComplete = (id: number) => {
    dispatch(todoFinish(id));
    toast.success(
      <span style={{ wordBreak: "break-all" }}>
        {!todo.done ? `Задача ${todo.title} - Завершена!` : "Действие отменено"}
      </span>,
      {
        duration: 4000,
        style: {
          display: "flex",
        },
      }
    );
  };

  const onClickEditTodo = (todo: number) => {
    dispatch(todoClicked(todo));
    setOpen(!open);
  };

  return (
    <li
      className={
        todo.done
          ? "list-group-item d-flex justify-content-between align-items-center completeTodo anim content"
          : "list-group-item d-flex justify-content-between align-items-center content"
      }
    >
      {open && <OpennedChangeMenu todo={todo} setOpen={setOpen} open={open} />}
      <span>
        {index + 1}. {todo.title}
      </span>
      <div className="buttons">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onClickEditTodo(todo.id)}
        >
          Изменить
        </button>
        <button
          className="btn btn-success "
          style={{ marginRight: "10px", marginLeft: "10px" }}
          onClick={() => onClickComplete(todo.id)}
        >
          Завершить
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onClickRemove(todo.id)}
        >
          Удалить
        </button>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </li>
  );
};

export default TodoItem;
