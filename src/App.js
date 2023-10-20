import "./App.css";
import { CategoryAdmin } from "./components/CategoryAdmin/CategoryAdmin";
import { ToDoList } from "./components/ToDoList/ToDoList";
import { Registration } from "./components/Registration/Registration";
import {ExpenseCalculator} from './components/ExpenseCalculator/ExpenseCalculator';

function App() {
  return (
    <div className="App">
      <CategoryAdmin />
      <ToDoList />
      <Registration />
      <ExpenseCalculator />
    </div>
  );
}

export default App;
