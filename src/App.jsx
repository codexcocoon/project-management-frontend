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
      </Routes>
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
