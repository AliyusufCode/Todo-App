import { ChangeEvent, useState, MouseEventHandler } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { addTodo } from "../../redux/Slices/TodoSlice";
import toast, { Toaster } from "react-hot-toast";

const TodoForm = () => {
  const [title, setTitle] = useState<string>("");
  const dispatch = useAppDispatch();

  const onClickAddTodo: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }
    const todoObject = {
      title,
      done: false,
      id: Date.now(),
    };
    toast.success(
      <span
        style={{ wordBreak: "break-all" }}
      >{`Дело ${title} - создано!`}</span>
    );
    dispatch(addTodo(todoObject));
    setTitle("");
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmitForm = (event: any) => {
    event.preventDefault();
    onClickAddTodo(event);
  };

  return (
    <form
      className="mb-3 d-flex align-items-end justify-content-between"
      onSubmit={handleSubmitForm}
    >
      <div className="form-group" style={{ width: "92%", marginRight: "10px" }}>
        <label htmlFor="" className="form-label">
          Введите название дела
        </label>
        <input
          type="text"
          value={title}
          onChange={handleChangeInput}
          className="form-control"
          maxLength={35}
        />
      </div>
      <button type="submit" className="btn btn-success" onClick={() => {}}>
        Создать
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
};
export default TodoForm;
