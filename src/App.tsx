import Header from "./components/Header/Header";
import TodoForm from "./components/TodoForm/TodoForm";
import "./App.css";
import TodoList from "./components/TodoList/TodoList";

function App() {
  return (
    <div>
      <Header />
      <main>
        <section>
          <div className="container mt-3">
            <TodoForm />
            <h2 className="pt-3">Новые дела</h2>
            <TodoList />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
