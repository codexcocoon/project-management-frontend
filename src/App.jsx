import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import ProjectDetails from "./pages/ProjectDetails";
import { ToastContainer } from "react-toastify";

function Layout() {
  const location = useLocation();

  // show navbar only on these pages
  const showNavbar = ["/", "/login", "/register"].includes(location.pathname);
  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/project-detail/:id"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/project/add"
          element={
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/project/edit/:id"
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/task/add"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/task/edit/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
function App() {
  return (
    <>
      <Router>
        <Layout />
      </Router>
    </>
  );
}
export default App;
