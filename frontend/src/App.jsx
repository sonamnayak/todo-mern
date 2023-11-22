import { Toaster } from "react-hot-toast";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from "./pages/Home";
import UserSetting from "./pages/UserSetting";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { auth } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoutes element={<Home />} />} />
          <Route
            path="edit_profile"
            element={<PrivateRoutes element={<UserSetting />} />}
          />
          {auth ? (
            <>
              <Route path="/register" element={<Navigate to="/" replace />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </>
  );
};

export default App;
