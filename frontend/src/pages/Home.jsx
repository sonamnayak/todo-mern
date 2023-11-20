import Header from "../components/Header";
import styles from "../styles/modules/app.module.scss";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "../components/TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchTodosThunk } from "../store/slices/todoSlice";
import { MdSettings } from "react-icons/md";
import UserSetting from "./UserSetting";
import { fetchUserThunk } from "../store/slices/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [todoModal, setTodoModal] = useState(false);

  useEffect(() => {
    !todoModal && dispatch(fetchTodosThunk());
  }, [todoModal]);

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, []);

  const [userSetting, setUserSetting] = useState(false);
  const todoList = useSelector((s) => s.todo.todoList);
  const status = useSelector((s) => s.todo.status);
  const filterStatus = useSelector((s) => s.todo.filterStatus);
  const sortedTodoList = [...todoList];
  sortedTodoList.sort(
    (a, b) =>
      new Date(b.updatedAt).toLocaleString() -
      new Date(a.updatedAt).toLocaleString()
  );
  const filteredTodoList = sortedTodoList.filter((todo) => {
    if (filterStatus === "all") return true;
    else return todo.status === filterStatus;
  });

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  if (status === "loading")
    return (
      <div className="container error">
        <p className={styles.emptyText}>Loading...</p>
      </div>
    );
  if (status === "error")
    return (
      <div className="container error">
        <p className={styles.emptyText}>Something Went Wrong!</p>
      </div>
    );
  return (
    <div className="container">
      <h1 className={styles.title}>TODO LIST</h1>
      <div className={styles.app__wrapper}>
        <Header todoModal={todoModal} setTodoModal={setTodoModal} />
      </div>
      <motion.div
        className={styles.content__wrapper}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {filteredTodoList.length > 0 ? (
            filteredTodoList.map((todo) => (
              <TodoItem todo={todo} key={todo._id} />
            ))
          ) : (
            <motion.p variants={child} className={styles.emptyText}>
              No task has been added yet.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
      <button
        className={`${styles.button} ${styles.button__primary} ${styles.button__logout}`}
        onClick={() => setUserSetting(true)}
      >
        <MdSettings fontSize={30} />
      </button>
      {userSetting && (
        <UserSetting
          setUserSetting={setUserSetting}
          userSetting={userSetting}
        />
      )}
    </div>
  );
};

export default Home;
