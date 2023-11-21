import { useState } from "react";
import styles from "../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";
import { useDispatch } from "react-redux";
import { updateFilterStatus } from "../store/slices/todoSlice";
import { MdOutlineAdd } from "react-icons/md";

const Header = ({ todoModal, setTodoModal }) => {
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState("all");

  const handleStatus = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className={styles.appHeader}>
      <button
        className={`${styles.button} ${styles.button__primary} ${styles.add_task}`}
        onClick={() => setTodoModal(true)}
      >
        {window.screen.width > 768 ? "Add Task" : <MdOutlineAdd />}
      </button>
      <select
        className={`${styles.button} ${styles.button__select}`}
        value={filterStatus}
        onChange={handleStatus}
      >
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>
      {todoModal && <TodoModal setTodoModal={setTodoModal} type="add" />}
    </div>
  );
};

export default Header;
