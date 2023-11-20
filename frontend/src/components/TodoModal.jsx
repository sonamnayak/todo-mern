import { useEffect, useState } from "react";
import styles from "../styles/modules/app.module.scss";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  addTodo,
  fetchTodosThunk,
  updateTodo,
} from "../store/slices/todoSlice";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const TodoModal = ({ setTodoModal, type, todo }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");

  useEffect(() => {
    if (type === "update") {
      setTitle(todo.title);
      setStatus(todo.status);
    }
  }, [todo]);

  const dropIn = {
    hidden: {
      opacity: 0,
      transform: "scale(0.9)",
    },
    visible: {
      transform: "scale(1)",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transform: "scale(0.9)",
      opacity: 0,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            title,
            status,
          })
        );
        dispatch(fetchTodosThunk());
      }
      if (type === "update") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              status,
            })
          );
          toast.success("Task updated successfully!");
        } else {
          toast.error("No changes have been made");
          return;
        }
      }
      setTodoModal(false);
    } else toast.error("Enter title to add task");
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.container}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className={styles.closeButton}
            initial={{ top: 40, opacity: 0 }}
            animate={{ top: -10, opacity: 1 }}
            exit={{ top: 40, opacity: 0 }}
            onClick={() => setTodoModal(false)}
          >
            <MdOutlineClose />
          </motion.div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.formTitle}>Add Task</h1>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </label>
            <label htmlFor="status">
              Status
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <button className={`${styles.button} ${styles.button__primary}`}>
                {type === "add" ? "Add Task" : "Update Task"}
              </button>
              <button
                className={`${styles.button} ${styles.button__secondary}`}
                onClick={() => setTodoModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TodoModal;
