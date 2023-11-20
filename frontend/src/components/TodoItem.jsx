import { useEffect, useState } from "react";
import TodoModal from "./TodoModal";
import { format, parseISO } from "date-fns";
import styles from "../styles/modules/app.module.scss";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../store/slices/todoSlice";
import { motion, useMotionValue, useTransform } from "framer-motion";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const [updateTodoModal, setUpdateTodoModal] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (todo.status === "complete") setChecked(true);
    else setChecked(false);
  }, [todo.status]);

  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? "incomplete" : "complete" })
    );
  };

  const checkVariants = {
    initial: {
      color: "#fff",
    },
    checked: { pathLength: 1 },
    unchecked: { pathLength: 0 },
  };

  const boxVariants = {
    checked: {
      background: "var(--primaryPurple)",
      transition: { duration: 0.1 },
    },
    unchecked: { background: "var(--gray-2)", transition: { duration: 0.1 } },
  };

  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails} onClick={handleCheck}>
          <motion.div
            animate={checked ? "checked" : "unchecked"}
            className={styles.svgBox}
            variants={boxVariants}
            onClick={() => handleCheck()}
          >
            <motion.svg
              className={styles.svg}
              viewBox="0 0 53 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                variants={checkVariants}
                animate={checked ? "checked" : "unchecked"}
                style={{ pathLength, opacity }}
                fill="none"
                strokeMiterlimit="10"
                strokeWidth="6"
                d="M1.5 22L16 36.5L51.5 1"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.div>
          <div className={styles.texts}>
            <p
              className={`${styles.todoText} ${
                todo.status === "complete" && styles.todoText__completed
              }`}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(parseISO(todo.updatedAt), "p, dd/MM/yyyy")}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div className={styles.icon} onClick={() => handleDelete(todo._id)}>
            <MdDelete />
          </div>
          <div className={styles.icon} onClick={() => setUpdateTodoModal(true)}>
            <MdEdit />
          </div>
        </div>
      </div>
      {updateTodoModal && (
        <TodoModal
          type="update"
          setTodoModal={setUpdateTodoModal}
          todo={todo}
        />
      )}
    </>
  );
};

export default TodoItem;
