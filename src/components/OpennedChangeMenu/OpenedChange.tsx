import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAppSelector } from "../../redux/hooks";
import { todoChange, todoUpdate } from "../../redux/Slices/TodoSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { ITodo } from "../../types/types";

const OpennedChangeMenu = ({
  todo,
  setOpen,
  open,
}: {
  todo: ITodo;
  setOpen: any;
  open: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const todoTitle = useAppSelector((state) => state.todos.todosChange);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const onClickEditTitle = (id: number) => {
    setIsLoading(true);
    dispatch(todoUpdate(id));
    setTimeout(() => {
      setOpen(!open);
      setIsLoading(false);
      toast.success(`Успешно изменено!`);
    }, 500);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-body ">
          <div>Редактировать дело:</div>
          <div className="close-button" onClick={() => setOpen(false)}>
            <IoClose className="icon" />
          </div>
        </div>
        <hr />
        <input
          type="text"
          value={todoTitle}
          className="form-control"
          onFocus={() => setFocused(true)}
          onChange={(e) => dispatch(todoChange(e.target.value))}
          autoFocus={focused}
        />
        <div className="modal-footer">
          <button
            className="btn btn-primary"
            onClick={() => onClickEditTitle(todo.id)}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              "Сохранить изменения"
            )}
          </button>
          <span className="btn btn-secondary" onClick={() => setOpen(!open)}>
            Назад
          </span>
        </div>
      </div>
    </div>
  );
};
export default OpennedChangeMenu;
